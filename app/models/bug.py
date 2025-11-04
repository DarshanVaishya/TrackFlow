import enum
from datetime import datetime, timezone
from typing import final

from app.database import Base
from sqlalchemy import Column, DateTime, Enum, Index, Integer, String, Text, func


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


class Bug(Base):
    __tablename__ = "bug"

    id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    status = Column(Enum(BugStatus), nullable=False)
    priority = Column(Enum(PriorityStates), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
        nullable=False,
    )

    __table_args__ = (
        Index("idx_bug_status", "status"),
        Index("idx_bug_priority", "priority"),
    )
