from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.database import get_db
from app.utils.formatter import format_response
from app.models import User
from app.utils.auth import create_access_token, get_current_user
from app.utils.password import verify_password


router = APIRouter(prefix="/auth", tags=["auth"])


class LoginRequest(BaseModel):
    email: str
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


@router.post("/login", response_model=TokenResponse)
def login_user(login: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == login.email.lower()).first()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid credentials"
        )

    if not verify_password(login.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid credentials"
        )

    token = create_access_token({"user": {"email": user.email, "id": user.id}})

    return TokenResponse(access_token=token)


@router.get("/me")
def get_me(current_user=Depends(get_current_user)):
    return current_user
