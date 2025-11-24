from fastapi import HTTPException, status
from sqlalchemy.exc import SQLAlchemyError
from app.models.project import Project
from app.database import get_db
from sqlalchemy.orm import Session

from app.schemas.project import CreateProjectPayload, UpdateProjectPayload
from app.utils.logger import logger


class ProjectService:
    @staticmethod
    def create_project(db: Session, project_data: CreateProjectPayload):
        try:
            project = Project(**project_data.model_dump())
            logger.debug(f"Creating a new project: {project.title}")
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
