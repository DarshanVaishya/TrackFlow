from pydantic import BaseModel


class CreateCommentPayload(BaseModel):
    content: str
    created_by_id: int

