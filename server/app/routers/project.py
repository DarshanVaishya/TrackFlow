from fastapi import APIRouter, Depends
from app.database import get_db
from sqlalchemy.orm import Session
from app.schemas.project import CreateProjectPayload, UpdateProjectPayload
from app.services.project_service import ProjectService
from app.utils.formatter import format_response
from app.utils.auth import get_current_user, oauth2_scheme
from app.models import User

router = APIRouter(prefix="/projects", tags=["Projects"])


@router.post("")
def create_project(
    project_data: CreateProjectPayload,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    project = ProjectService.create_project(db, project_data, current_user)
    return format_response(project, message="Project created successfully.")


@router.get("/{project_id}")
def get_a_project(
    project_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    project = ProjectService.get_project_by_id(db, project_id)
    return format_response(project)


@router.get("")
def get_all_projects(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    projects = ProjectService.get_all_projects(db)
    return format_response(projects)


@router.put("/{project_id}")
def update_project(
    project_id: int,
    update_data: UpdateProjectPayload,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    project = ProjectService.update_project(project_id, update_data, db, current_user)
    return format_response(project, message="Project updated successfully.")


@router.delete("/{project_id}")
def delete_project(
    project_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    ProjectService.delete_project(db, project_id, current_user)
    return {"message": "Project deleted successfully"}


@router.post("/{project_id}/members/add/{user_id}")
def add_member_to_project(
    user_id: int,
    project_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    project = ProjectService.add_member_to_project(db, user_id, project_id)
    return format_response(project, "Successfully added user to the project")


@router.delete("/{project_id}/members/remove/{user_id}")
def remove_member_from_project(
    user_id: int,
    project_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    project = ProjectService.remove_member_from_project(db, user_id, project_id)
    return format_response(project, "Successfully removed user from the project")


@router.get("/user/{user_id}")
def get_projects_for_user(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    projects = ProjectService.get_all_projects_for_user(db, current_user)
    return format_response(
        projects, f"Successfully fetched all projects for user {current_user.id}"
    )


@router.get("/{project_id}/users")
def get_all_users_for_project(
    project_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    users = ProjectService.get_all_users_for_project(db, project_id)
    return format_response(
        users,
        f"Successfully fetched all users from the project {project_id}",
    )
