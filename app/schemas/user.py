from datetime import datetime
from pydantic import BaseModel, EmailStr, Field, field_validator


class CreateUserPayload(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=8, max_length=128)

    @field_validator("password")
    @classmethod
    def validate_password_strength(cls, v: str) -> str:
        if len(v) < 8:
            raise ValueError("Password must be at least 8 characters long.")
        return v


class UpdateUserPayload(BaseModel):
    email: str | None = None
    password: str | None = None

    @field_validator("password")
    @classmethod
    def validate_password_strength(cls, v: str | None) -> str | None:
        if v is None:
            return v
        if len(v) < 8:
            raise ValueError("Password must be at least 8 characters long")

        return v


class UserResponse(BaseModel):
    id: int
    email: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class UserResponseWithMsg(BaseModel):
    msg: str
    data: UserResponse
