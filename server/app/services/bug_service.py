from fastapi import HTTPException, status
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session

from app.models import Bug, User
from app.schemas import CreateBugPayload, UpdateBugPayload
from app.utils.logger import logger


class BugService:
    @staticmethod
    def get_all_bugs(db: Session) -> list[Bug]:
        try:
            logger.debug("Fetching all bugs from database.")
            bugs = db.query(Bug).all()
            logger.info(f"Successfully fetched {len(bugs)} bugs.")
            return bugs
        except SQLAlchemyError as e:
            logger.error(f"Database error while fetching all bugs: {str(e)}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Database error: {str(e)}",
            )

    @staticmethod
    def get_bug_by_id(db: Session, bug_id: int) -> Bug:
        logger.debug(f"Fetching bug by ID: {bug_id}")
        try:
            bug = db.query(Bug).filter(Bug.id == bug_id).first()
            if not bug:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail=f"Bug with id {bug_id} not found.",
                )
            logger.info(
                f"Successfully retrieved bug - ID: {bug_id}, title: {bug.title}"
            )
            return bug
        except HTTPException:
            raise
        except SQLAlchemyError as e:
            logger.error(f"Database error while fetching bug {bug_id}: {str(e)}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Database error: {str(e)}",
            )

    @staticmethod
    def create_bug(db: Session, bug_data: CreateBugPayload) -> Bug:
        try:
            new_bug = Bug(**bug_data.model_dump())
            logger.debug(f"Creating a new bug: {new_bug.title}")
            user = db.query(User).filter(User.id == new_bug.created_by_id).first()
            if not user:
                raise HTTPException(
                    status_code=404,
                    detail=f"User with id {new_bug.created_by_id} does not exist.",
                )

            db.add(new_bug)
            db.commit()
            db.refresh(new_bug)
            logger.info(
                "Successfully created new bug: "
                f"ID: {new_bug.id}, "
                f"Title: {new_bug.title}, "
            )
            return new_bug
        except SQLAlchemyError as e:
            db.rollback()
            logger.warning(
                f"Integrity error during bug creation - Title: {bug_data.title}, Error: {str(e)}"
            )
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Database error: {str(e)}",
            )

    @staticmethod
    def update_bug(db: Session, bug_id: int, update_data: UpdateBugPayload) -> Bug:
        bug = BugService.get_bug_by_id(db, bug_id)
        logger.debug(f"Updating bug - ID: {bug_id}")

        try:
            update_dict = update_data.model_dump(exclude_unset=True)

            # TODO: Create a util function to log all fields to be updated
            fields_to_update = [k for k in update_dict.keys()]
            if fields_to_update:
                logger.debug(
                    f"Updating fields for bug {bug_id}: {', '.join(fields_to_update)}"
                )
            for field, value in update_dict.items():
                setattr(bug, field, value)

            db.commit()
            db.refresh(bug)
            logger.info(f"Successfully updated bug - ID: {bug_id}, Title: {bug.title}")
            return bug
        except SQLAlchemyError as e:
            db.rollback()
            logger.warning(
                f"Integrity error during bug creation - Title: {bug.title}, Error: {str(e)}"
            )
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Database error: {str(e)}",
            )

    # TODO: Make sure created_bu_id and request user id are the same before deleting
    @staticmethod
    def delete_bug(db: Session, bug_id: int) -> Bug:
        logger.debug(f"Attempting to delete bug - ID: {bug_id}")
        bug = BugService.get_bug_by_id(db, bug_id)

        try:
            db.delete(bug)
            db.commit()
            logger.info(f"Successfully deleted bug - ID: {bug_id}")
            return bug
        except SQLAlchemyError as e:
            db.rollback()
            logger.error(
                f"Database error during bug deletion - ID: {bug_id}, Error: {str(e)}"
            )
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Database error: {str(e)}",
            )
