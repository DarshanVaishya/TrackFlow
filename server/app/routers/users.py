from app.database import get_db
from app.models import User
from app.schemas.user import (
    CreateUserPayload,
    UpdateUserPayload,
    UserResponse,
    UserResponseWithMsg,
)
from app.services.user_service import UserService
from app.utils.auth import get_current_user
from app.utils.formatter import format_response
from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

router = APIRouter(prefix="/users", tags=["users"])


@router.get("", response_model=UserResponse, status_code=status.HTTP_200_OK)
def get_all_users(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    users = UserService.get_all_users(db)
    return format_response(users)


@router.get("/{user_id}", response_model=UserResponse, status_code=status.HTTP_200_OK)
def get_user_by_id(
    user_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    user = UserService.get_user_by_id(db, user_id)
    return format_response(user)


@router.post(
    "", response_model=UserResponseWithMsg, status_code=status.HTTP_201_CREATED
)
def create_user(user_data: CreateUserPayload, db: Session = Depends(get_db)):
    new_user = UserService.create_user(db, user_data)
    return format_response(new_user, "New user created successfully.")


@router.put(
    "/{user_id}", response_model=UserResponseWithMsg, status_code=status.HTTP_200_OK
)
def update_user(
    user_id: int,
    user_data: UpdateUserPayload,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    updated_user = UserService.update_user(db, user_id, user_data)
    return format_response(updated_user, "User data has been updated")


@router.delete(
    "/{user_id}", response_model=UserResponseWithMsg, status_code=status.HTTP_200_OK
)
def delete_user(
    user_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    deleted_user = UserService.delete_user(db, user_id)
    return format_response(deleted_user, "User has been deleted successfully.")
