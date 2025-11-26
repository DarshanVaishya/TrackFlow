from fastapi import HTTPException, status
from sqlalchemy.exc import SQLAlchemyError
from app.models.project import Project
from app.database import get_db
from sqlalchemy.orm import Session, joinedload

from app.schemas.project import CreateProjectPayload, UpdateProjectPayload
from app.utils.logger import logger
from app.models import User
from app.services.user_service import UserService


class ProjectService:
    @staticmethod
    def create_project(db: Session, project_data: CreateProjectPayload):
        try:
            project = Project(**project_data.model_dump())
            logger.debug(f"Creating a new project: {project.title}")

            user = db.query(User).filter(User.id == project.created_by_id).first()
            if not user:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail=f"User with id {project.created_by_id} not found.",
                )

            project.members.append(user)

            db.add(project)
            db.commit()
            db.refresh(project)
            logger.info(
                f"Successfully created new project: ID: {project.id} Title: {project.title}"
            )
            return project
        except SQLAlchemyError as e:
            db.rollback()
            logger.warning(
                f"Integrity error during project creation - Title: {project_data.title}, Error: {str(e)}"
            )
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Database error: {str(e)}",
            )

    @staticmethod
    def get_project_by_id(db: Session, project_id: int):
        logger.debug(f"Fetching project with id {project_id}")
        try:
            project = db.query(Project).filter(Project.id == project_id).first()
            if not project:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail=f"Project with id {project_id} not found.",
                )
            logger.info(
                f"Successfully retreived project - ID: {project_id}, title: {project.title}"
            )
            _ = project.bugs
            _ = project.members
            return project
        except HTTPException:
            raise
        except SQLAlchemyError as e:
            logger.error(
                f"Database error while fetching project {project_id}: {str(e)}"
            )
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Database error: {str(e)}",
            )

    @staticmethod
    def get_all_projects(db: Session):
        try:
            logger.debug(f"Fetching all the projects from the database")
            projects = db.query(Project).all()
            logger.info(f"Successfully fetched {len(projects)} projects.")

            for project in projects:
                _ = project.bugs
                _ = project.members

            return projects
        except SQLAlchemyError as e:
            logger.error(f"Database error while fetching all projects: {str(e)}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Database error: {str(e)}",
            )

    @staticmethod
    def update_project(project_id: int, update_data: UpdateProjectPayload, db: Session):
        logger.debug(f"Updating project - ID: {project_id}")
        project = ProjectService.get_project_by_id(db, project_id)

        try:
            update_dict = update_data.model_dump(exclude_unset=True)
            fields_to_update = [k for k in update_dict.keys()]
            logger.debug(
                f"Updating fields for project {project_id}: {', '.join(fields_to_update)}"
            )

            for field, value in update_dict.items():
                setattr(project, field, value)

            db.commit()
            db.refresh(project)
            logger.info(
                f"Successfully updated project - ID: {project_id}, Title: {project.title}"
            )
            return project
        except SQLAlchemyError as e:
            db.rollback()
            logger.warning(
                f"Integrity error during project update - Title: {project.title}, Error: {str(e)}"
            )
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Database error: {str(e)}",
            )

    @staticmethod
    def delete_project(db: Session, project_id: int):
        logger.debug(f"Attempting to delete project - ID: {project_id}")
        project = ProjectService.get_project_by_id(db, project_id)
        try:
            db.delete(project)
            db.commit()
            logger.info(f"Successfully deleted project - ID: {project_id}")
            return project
        except SQLAlchemyError as e:
            db.rollback()
            logger.error(
                f"Database error during project deletion - ID: {project_id}, Error: {str(e)}"
            )
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Database error: {str(e)}",
            )

    @staticmethod
    def add_member_to_project(db: Session, user_id: int, project_id: int):
        logger.debug(f"Attempting to add user {user_id} to project {project_id}")
        project = ProjectService.get_project_by_id(db, project_id)
        user = UserService.get_user_by_id(db, user_id)

        if user not in project.members:
            project.members.append(user)
            db.commit()
            db.refresh(project)
            logger.info(f"Successfully added user {user_id} to project {project_id}")
        else:
            logger.warning(f"User {user_id} already assigned to project {project_id}")

        _ = project.members
        _ = project.bugs

        return project

    @staticmethod
    def remove_member_from_project(db: Session, user_id: int, project_id: int):
        logger.debug(f"Attempting to unassign user {user_id} from project {project_id}")
        project = ProjectService.get_project_by_id(db, project_id)
        user = UserService.get_user_by_id(db, user_id)

        if user in project.members:
            project.members.remove(user)
            db.commit()
            db.refresh(project)
            logger.info(
                f"Successfully unassigned user {user_id} from project {project_id}"
            )
        else:
            logger.warning(f"User {user_id} is not assigned to project {project_id}")

        _ = project.members
        _ = project.bugs

        return project

    @staticmethod
    def get_all_projects_for_user(db: Session, user_id: int):
        logger.debug(f"Attempting to fetch all projects for user {user_id}")
        user = UserService.get_user_by_id(db, user_id)
        projects = (
            db.query(Project)
            .join(Project.members)
            .filter(User.id == user_id)
            .options(
                joinedload(Project.bugs),
                joinedload(Project.members),
            )
            .all()
        )
        logger.info(f"Fetched {len(projects)} projects for user {user_id}")
        return projects

    @staticmethod
    def get_all_users_for_project(db: Session, project_id: int):
        logger.debug(f"Attempting to fetch all users for project {project_id}")
        project = ProjectService.get_project_by_id(db, project_id)
        users = project.members
        logger.info(f"Fetched {len(users)} users from project {project_id}")
        return users
