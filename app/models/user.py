from datetime import datetime, timezone

from sqlalchemy.orm import deferred
from app.database import Base
from sqlalchemy import Column, DateTime, Integer, String, func


class User(Base):
    __tablename__ = "user"

    id = Column(Integer, primary_key=True, autoincrement=True)
    email = Column(String(255), nullable=False, unique=True)
    password = deferred(Column(String(255), nullable=False))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
        nullable=False,
    )
