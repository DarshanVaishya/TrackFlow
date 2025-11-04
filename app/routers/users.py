from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from starlette.status import HTTP_200_OK, HTTP_201_CREATED

from app.database import get_db
from app.models.user import User
from app.schemas.user import (
    CreateUserPayload,
    UpdateUserPayload,
    UserResponse,
    UserResponseWithMsg,
)
from app.services.user_service import UserService


router = APIRouter(prefix="/users", tags=["users"])


@router.get("", response_model=list[UserResponse])
def get_all_users(db: Session = Depends(get_db)):
    return UserService.get_all_users(db)


@router.get("/{user_id}", response_model=UserResponse)
def get_user_by_id(user_id: int, db: Session = Depends(get_db)):
    return UserService.get_user_by_id(db, user_id)


@router.post("", response_model=UserResponseWithMsg, status_code=HTTP_201_CREATED)
def create_user(user_data: CreateUserPayload, db: Session = Depends(get_db)):
    new_user = UserService.create_user(db, user_data)
    return {"msg": "New user created successfully.", "data": new_user}


@router.put("/{user_id}", response_model=UserResponseWithMsg)
def update_user(
    user_id: int, user_data: UpdateUserPayload, db: Session = Depends(get_db)
):
    new_user = UserService.update_user(db, user_id, user_data)
    return {"msg": "User data has been updated", "data": new_user}


@router.delete(
    "/{user_id}", response_model=UserResponseWithMsg, status_code=HTTP_200_OK
)
def delete_user(user_id: int, db: Session = Depends(get_db)):
    deleted_user = UserService.delete_user(db, user_id)
    return {"msg": "User has been deleted successfully.", "data": deleted_user}
