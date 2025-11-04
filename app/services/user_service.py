from fastapi import HTTPException
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session
from starlette.status import HTTP_404_NOT_FOUND, HTTP_500_INTERNAL_SERVER_ERROR

from app.models.user import User
from app.schemas.bug import UpdateBugPayload
from app.schemas.user import CreateUserPayload, UpdateUserPayload

# For authentication
# def get_user_with_password(session: Session, email: str):
#     # Explicitly load the password column using undefer option
#     from sqlalchemy.orm import undefer
#
#     user = session.query(User).options(undefer(User.password)).filter(User.email == email).first()
#     return user


class UserService:
    @staticmethod
    def create_user(db: Session, user_data: CreateUserPayload) -> User:
        try:
            new_user = User(**user_data.model_dump())
            db.add(new_user)
            db.commit()
            db.refresh(new_user)
            return new_user
        except SQLAlchemyError as e:
            db.rollback()
            raise HTTPException(
                status_code=HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Database error: {str(e)}",
            )

    @staticmethod
    def get_all_users(db: Session) -> list[User]:
        return db.query(User).all()

    @staticmethod
    def get_user_by_id(db: Session, user_id: int) -> User:
        user = db.query(User).filter(User.id == user_id).first()
        if not user:
            raise HTTPException(
                status_code=HTTP_404_NOT_FOUND,
                detail=f"User with id {user_id} not found.",
            )
        return user

    @staticmethod
    def update_user(db: Session, user_id: int, update_data: UpdateUserPayload) -> User:
        user = UserService.get_user_by_id(db, user_id)

        try:
            update_dict = update_data.model_dump(exclude_unset=True)
            for field, value in update_dict.items():
                setattr(user, field, value)

            db.commit()
            db.refresh(user)
        except SQLAlchemyError as e:
            db.rollback()
            raise HTTPException(
                status_code=HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Database error: {str(e)}",
            )

        return user

    @staticmethod
    def delete_user(db: Session, user_id: int) -> User:
        user = UserService.get_user_by_id(db, user_id)
        try:
            db.delete(user)
            db.commit()
            return user
        except SQLAlchemyError as e:
            db.rollback()
            raise HTTPException(
                status_code=HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Database error: {str(e)}",
            )
