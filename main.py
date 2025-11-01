import enum
import os
from datetime import datetime
from typing import Optional, final

from dotenv import load_dotenv
from fastapi import Depends, FastAPI, HTTPException
from pydantic import BaseModel, Field
from sqlalchemy import (
    Column,
    DateTime,
    Enum,
    Index,
    Integer,
    String,
    Text,
    create_engine,
    func,
)
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session, declarative_base, sessionmaker
from starlette.status import (
    HTTP_200_OK,
    HTTP_201_CREATED,
    HTTP_404_NOT_FOUND,
    HTTP_500_INTERNAL_SERVER_ERROR,
)

# Database
_ = load_dotenv()

DB_URL = os.getenv("DB_URL")
if not DB_URL:
    raise ValueError("DB_URL environment variable is not set!")

engine = create_engine(DB_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


class BugStatus(enum.Enum):
    todo = "todo"
    in_progress = "in_progress"
    in_review = "in_review"
    done = "done"


class PriorityStates(enum.Enum):
    low = "low"
    medium = "medium"
    high = "high"
    top = "top"


@final
class Bug(Base):
    __tablename__ = "bug"

    id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    status = Column(Enum(BugStatus), nullable=False)
    priority = Column(Enum(PriorityStates), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )

    __table_args__ = (
        Index("idx_bug_status", "status"),
        Index("idx_bug_priority", "priority"),
    )


Base.metadata.create_all(engine)

# App
app = FastAPI(
    title="Bug Tracker API",
    description="A bug tracking API made with FastAPI",
)


@app.get("/")
def root():
    return {"msg": "The app is working"}


# Payloads
class CreateBugPayload(BaseModel):
    title: str = Field(..., min_length=1, max_length=255)
    description: str = Field(..., min_length=1)
    status: BugStatus
    priority: PriorityStates


class UpdateBugPayload(BaseModel):
    title: str | None
    description: Optional[str] = Field(None, min_length=1)
    status: Optional[BugStatus] = None
    priority: Optional[PriorityStates] = None


# Response enums
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


class CreateBugResponse(BaseModel):
    message: str
    bug: BugResponse


# Routes
@app.get("/bugs", response_model=list[BugResponse])
def get_all_bugs(db: Session = Depends(get_db)):
    bugs = db.query(Bug).all()
    return bugs


@app.get("/bugs/{bugId}", response_model=BugResponse)
def get_a_bug(bugId: int, db: Session = Depends(get_db)):
    bug = db.query(Bug).filter(Bug.id == bugId).first()
    if not bug:
        raise HTTPException(
            status_code=HTTP_404_NOT_FOUND, detail=f"Bug with id {bugId} not found."
        )
    return bug


@app.post("/bugs", response_model=CreateBugResponse, status_code=HTTP_201_CREATED)
def create_bug(bug: CreateBugPayload, db: Session = Depends(get_db)):
    try:
        new_bug = Bug(**bug.model_dump())
        db.add(new_bug)
        db.commit()
        db.refresh(new_bug)
        return {"message": "Bug created successfully.", "bug": new_bug}
    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(
            status_code=HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Database error: {str(e)}",
        )


@app.put("/bugs/{bugId}", response_model=BugResponse)
def update_bug(
    bugId: int, update_data: UpdateBugPayload, db: Session = Depends(get_db)
):
    bug = db.query(Bug).filter(Bug.id == bugId).first()
    if not bug:
        raise HTTPException(
            status_code=HTTP_404_NOT_FOUND, detail=f"Bug with id {bugId} not found."
        )

    try:
        update_dict = update_data.model_dump(exclude_unset=True)
        for field, value in update_dict.items():
            setattr(bug, field, value)

        db.commit()
        db.refresh(bug)
        return bug
    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(
            status_code=HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Database error: {str(e)}",
        )


@app.delete("/bugs/{bugId}", status_code=HTTP_200_OK)
def delete_bug(bugId: int, db: Session = Depends(get_db)):
    try:
        bug = db.query(Bug).filter(Bug.id == bugId).first()
        if not bug:
            raise HTTPException(
                status_code=HTTP_404_NOT_FOUND, detail=f"Bug with id {bugId} not found."
            )
        db.delete(bug)
        db.commit()

        return {"msg": f"Bug with id {bugId} deleted successfully."}
    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(
            status_code=HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Database error: {str(e)}",
        )
