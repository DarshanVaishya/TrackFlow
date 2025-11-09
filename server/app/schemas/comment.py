from pydantic import BaseModel


class CreateCommentPayload(BaseModel):
    content: str
    created_by_id: int
    bug_id: int


class UpdateCommentPayload(BaseModel):
    content: str
