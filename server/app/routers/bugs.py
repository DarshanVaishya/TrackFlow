from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas import (
    BugResponse,
    BugResponseWithMsg,
    CreateBugPayload,
    UpdateBugPayload,
)
from app.services.bug_service import BugService
from app.utils.formatter import format_response

router = APIRouter(prefix="/bugs", tags=["bugs"])


@router.get("", response_model=BugResponse)
def get_all_bugs(db: Session = Depends(get_db)):
    bugs = BugService.get_all_bugs(db)
    return format_response(bugs)


@router.get("/{bug_id}", response_model=BugResponse)
def get_a_bug(bug_id: int, db: Session = Depends(get_db)):
    bug = BugService.get_bug_by_id(db, bug_id)
    return format_response(bug)


@router.post("", response_model=BugResponseWithMsg, status_code=status.HTTP_201_CREATED)
def create_bug(bug: CreateBugPayload, db: Session = Depends(get_db)):
    new_bug = BugService.create_bug(db, bug)
    return format_response(new_bug, "New bug created successfully")


@router.put("/{bug_id}", response_model=BugResponseWithMsg)
def update_bug(
    bug_id: int, update_data: UpdateBugPayload, db: Session = Depends(get_db)
):
    bug = BugService.update_bug(db, bug_id, update_data)
    return format_response(bug, f"Bug with id {bug_id} updated successfully")


@router.delete("/{bug_id}", status_code=status.HTTP_200_OK)
def delete_bug(bug_id: int, db: Session = Depends(get_db)):
    bug = BugService.delete_bug(db, bug_id)
    return format_response(bug, f"Bug with id {bug_id} deleted successfully")
