from app.database import get_db
from app.models import User
from app.schemas import (
    BugResponse,
    BugResponseWithMsg,
    CreateBugPayload,
    UpdateBugPayload,
)
from app.services.bug_service import BugService
from app.utils.auth import get_current_user
from app.utils.formatter import format_response
from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

router = APIRouter(tags=["bugs"])


@router.get("/projects/{project_id}/bugs", response_model=BugResponse)
def get_all_bugs(
    project_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    bugs = BugService.get_all_bugs(project_id, db)
    return format_response(bugs)


@router.get("/bugs/{bug_id}")
def get_a_bug(
    bug_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    bug = BugService.get_bug_by_id(db, bug_id)
    return format_response(bug)


@router.post(
    "/bugs", response_model=BugResponseWithMsg, status_code=status.HTTP_201_CREATED
)
def create_bug(
    bug: CreateBugPayload,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    new_bug = BugService.create_bug(db, bug, current_user)
    return format_response(new_bug, "New bug created successfully")


@router.put("/bugs/{bug_id}", response_model=BugResponseWithMsg)
def update_bug(
    bug_id: int,
    update_data: UpdateBugPayload,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    bug = BugService.update_bug(db, bug_id, update_data, current_user)
    return format_response(bug, f"Bug with id {bug_id} updated successfully")


@router.delete("/bugs/{bug_id}", status_code=status.HTTP_200_OK)
def delete_bug(
    bug_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    bug = BugService.delete_bug(db, bug_id, current_user)
    return format_response(bug, f"Bug with id {bug_id} deleted successfully")


@router.post("/bugs/{bug_id}/assign/{user_id}")
def assign_user_to_bug(
    bug_id: int,
    user_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    bug = BugService.assign_user_to_bug(bug_id, user_id, db, current_user)
    return format_response(bug, f"Successfully assign user {user_id} to bug {bug_id}")


@router.delete("/bugs/{bug_id}/unassign/{user_id}")
def unassign_user_to_bug(
    bug_id: int,
    user_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    bug = BugService.unassign_user_to_bug(bug_id, user_id, db, current_user)
    return format_response(
        bug, f"Successfully unassigned user {user_id} from bug {bug_id}"
    )
