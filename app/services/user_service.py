from fastapi import HTTPException
from sqlalchemy.exc import IntegrityError, SQLAlchemyError
from sqlalchemy.orm import Session
from starlette.status import (
    HTTP_404_NOT_FOUND,
    HTTP_409_CONFLICT,
    HTTP_500_INTERNAL_SERVER_ERROR,
)

from app.schemas.bug import UpdateBugPayload
from app.schemas.user import CreateUserPayload, UpdateUserPayload
from app.utils.password import hash_password
from app.models import User

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
            user_dict = user_data.model_dump()
            user_dict["password"] = hash_password(user_dict["password"])

            new_user = User(**user_dict)
            db.add(new_user)
            db.commit()
            db.refresh(new_user)
            return new_user
        except IntegrityError as e:
            db.rollback()
            if "unique constraint" in str(e).lower() or "duplicate" in str(e).lower():
                raise HTTPException(
                    status_code=HTTP_409_CONFLICT,
                    detail="A user with this email already exists.",
                )
            raise HTTPException(
                status_code=HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Database integrity error: {str(e)}",
            )
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

            if "password" in update_dict and update_dict["password"]:
                update_dict["password"] = hash_password(update_dict["password"])

            for field, value in update_dict.items():
                setattr(user, field, value)

            db.commit()
            db.refresh(user)
        except IntegrityError as e:
            db.rollback()
            if "unique constraint" in str(e).lower() or "duplicate" in str(e).lower():
                raise HTTPException(
                    status_code=HTTP_409_CONFLICT,
                    detail="A user with this email already exists.",
                )
            raise HTTPException(
                status_code=HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Database integrity error: {str(e)}",
            )
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
