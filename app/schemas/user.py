from datetime import datetime
from pydantic import BaseModel, EmailStr, Field


class CreateUserPayload(BaseModel):
    email: str = Field(..., min_length=3, max_length=255)
    password: str


class UpdateUserPayload(BaseModel):
    email: str | None = None
    password: str | None = None


class UserResponse(BaseModel):
    id: int
    email: str
    created_at: datetime
    updated_at: datetime


class UserResponseWithMsg(BaseModel):
    msg: str
    data: UserResponse
