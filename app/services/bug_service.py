from typing import List, Optional

from fastapi import HTTPException
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session
from starlette.status import HTTP_404_NOT_FOUND, HTTP_500_INTERNAL_SERVER_ERROR

from app.models import Bug
from app.schemas import BugResponseWithMsg, CreateBugPayload, UpdateBugPayload


class BugService:
    @staticmethod
    def get_all_bugs(db: Session) -> List[Bug]:
        """Retrieve all bugs from the database."""
        return db.query(Bug).all()

    @staticmethod
    def get_bug_by_id(db: Session, bug_id: int) -> Bug:
        """Retrieve a single bug by ID."""
        bug = db.query(Bug).filter(Bug.id == bug_id).first()
        if not bug:
            raise HTTPException(
                status_code=HTTP_404_NOT_FOUND,
                detail=f"Bug with id {bug_id} not found.",
            )
        return bug

    @staticmethod
    def create_bug(db: Session, bug_data: CreateBugPayload) -> Bug:
        """Create a new bug."""
        try:
            new_bug = Bug(**bug_data.model_dump())
            db.add(new_bug)
            db.commit()
            db.refresh(new_bug)
            return new_bug
        except SQLAlchemyError as e:
            db.rollback()
            raise HTTPException(
                status_code=HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Database error: {str(e)}",
            )

    @staticmethod
    def update_bug(db: Session, bug_id: int, update_data: UpdateBugPayload) -> Bug:
        """Update an existing bug."""
        bug = BugService.get_bug_by_id(db, bug_id)

        try:
            update_dict = update_data.model_dump(exclude_unset=True)
            for field, value in update_dict.items():
                setattr(bug, field, value)

            db.commit()
            db.refresh(bug)
            return bug
        except SQLAlchemyError as e:
            db.rollback()
            raise HTTPException(
                status_code=HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Database error: {str(e)}",
            )

    @staticmethod
    def delete_bug(db: Session, bug_id: int) -> Bug:
        """Delete a bug by ID."""
        bug = BugService.get_bug_by_id(db, bug_id)

        try:
            db.delete(bug)
            db.commit()
            return bug
        except SQLAlchemyError as e:
            db.rollback()
            raise HTTPException(
                status_code=HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Database error: {str(e)}",
            )
