from datetime import datetime
from typing import Optional

from pydantic import BaseModel, Field

from app.models.bug import BugStatus, PriorityStates


class CreateBugPayload(BaseModel):
    title: str = Field(..., min_length=1, max_length=255)
    description: str = Field(..., min_length=1)
    status: BugStatus
    priority: PriorityStates
    created_by_id: int


class UpdateBugPayload(BaseModel):
    title: Optional[str] = Field(None, min_length=1, max_length=255)
    description: Optional[str] = Field(None, min_length=1)
    status: Optional[BugStatus] = None
    priority: Optional[PriorityStates] = None


class BugResponse(BaseModel):
    id: int
    title: str
    description: str
    status: BugStatus
    priority: PriorityStates
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class BugResponseWithMsg(BaseModel):
    message: str
    bug: BugResponse
