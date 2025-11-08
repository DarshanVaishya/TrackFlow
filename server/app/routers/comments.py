from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.comment import CreateCommentPayload
from app.services.comment_service import CommentService
from app.utils.formatter import format_response


router = APIRouter(tags=["comments"])


@router.get("/bugs/{bug_id}/comments")
def get_all_comments(bug_id: int, db: Session = Depends(get_db)):
    comments = CommentService.get_all_comments(db, bug_id)
    return format_response(comments)


@router.post("/comments")
def create_comment(comment_data: CreateCommentPayload, db: Session = Depends(get_db)):
    new_comment = CommentService.create_comment(db, comment_data)
    return format_response(new_comment, "New comment created successfully")
