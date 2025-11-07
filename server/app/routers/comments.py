from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db
from services.comment_service import CommentService
from app.utils.formatter import format_response


router = APIRouter(tags=["comments"])


@router.get("/bugs/{bug_id}/comments")
def get_all_comments(bug_id: int, db: Session = Depends(get_db)):
    comments = CommentService.get_all_comments(db, bug_id)
    return format_response(comments)
