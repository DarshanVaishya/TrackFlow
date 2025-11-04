from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from starlette.status import HTTP_200_OK, HTTP_201_CREATED

from app.database import get_db
from app.schemas import (
    BugResponse,
    BugResponseWithMsg,
    CreateBugPayload,
    UpdateBugPayload,
)
from app.services.bug_service import BugService

router = APIRouter(prefix="/bugs", tags=["bugs"])


@router.get("", response_model=list[BugResponse])
def get_all_bugs(db: Session = Depends(get_db)):
    return BugService.get_all_bugs(db)


@router.get("/{bug_id}", response_model=BugResponse)
def get_a_bug(bug_id: int, db: Session = Depends(get_db)):
    return BugService.get_bug_by_id(db, bug_id)


@router.post("", response_model=BugResponseWithMsg, status_code=HTTP_201_CREATED)
def create_bug(bug: CreateBugPayload, db: Session = Depends(get_db)):
    new_bug = BugService.create_bug(db, bug)
    return {"message": "Bug created successfully.", "bug": new_bug}


@router.put("/{bug_id}", response_model=BugResponseWithMsg)
def update_bug(
    bug_id: int, update_data: UpdateBugPayload, db: Session = Depends(get_db)
):
    bug = BugService.update_bug(db, bug_id, update_data)
    return {"msg": f"Bug with id {bug_id} updated successfully", "data": bug}


@router.delete("/{bug_id}", status_code=HTTP_200_OK)
def delete_bug(bug_id: int, db: Session = Depends(get_db)):
    bug = BugService.delete_bug(db, bug_id)
    return {"msg": f"Bug with id {bug_id} deleted successfully", "data": bug}
