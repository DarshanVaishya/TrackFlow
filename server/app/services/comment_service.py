from fastapi import HTTPException, status
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session

from app.utils.logger import logger
from app.models import Comment
from app.schemas.comment import CreateCommentPayload
from app.services.bug_service import BugService


class CommentService:
    # @staticmethod
    # def get_a_comment(db: Session, comment_id: int):
    #     logger.debug(f"Fetching comment by ID: {comment_id}")
    #     try:
    #         comment = db.query(Comment).filter(Comment.id == comment_id).first()
    #         if not comment:
    #             raise HTTPException(
    #                 status_code=status.HTTP_404_NOT_FOUND,
    #                 detail=f"Comment with id {comment_id} not found.",
    #             )
    #         logger.info(f"Successfully retrieved comment - ID: {comment_id}")
    #         return comment
    #     except HTTPException:
    #         raise
    #     except SQLAlchemyError as e:
    #         logger.error(
    #             f"Database error while fetching comment {comment_id}: {str(e)}"
    #         )
    #         raise HTTPException(
    #             status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
    #             detail=f"Database error: {str(e)}",
    #         )

    @staticmethod
    def get_all_comments(db: Session, bug_id: int) -> list[Comment]:
        try:
            logger.debug(f"Fetching all comments from bug with id {bug_id}.")
            bug = BugService.get_bug_by_id(db, bug_id)
            comments = bug.comments.all()
            logger.info(f"Successfully fetched {len(comments)} comments.")
            return comments
        except SQLAlchemyError as e:
            logger.error(f"Database error while fetching all comments: {str(e)}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Database error: {str(e)}",
            )

    @staticmethod
    def create_comment(db: Session, comment_data: CreateCommentPayload):
        try:
            new_comment = Comment(**comment_data.model_dump())
            # TODO: Check if bug exists
            # TODO: Check if user exists
            logger.debug(f"Creating a new comment: {comment_data.content}")
            db.add(new_comment)
            db.commit()
            db.refresh(new_comment)
            logger.info(
                "Successfully created new comment: "
                f"ID: {new_comment.id}, "
                f"Content: {new_comment.content}, "
            )
            return new_comment
        except SQLAlchemyError as e:
            db.rollback()
            logger.warning(
                f"Integrity error during comment creation - Content: {comment_data.content}, Error: {str(e)}"
            )
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Database error: {str(e)}",
            )
