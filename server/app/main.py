from fastapi import FastAPI

from app.models import User, Bug
from app.config import get_settings
from app.database import Base, engine
from app.routers import bugs
from app.routers import users

# Create database tables
# Base.metadata.drop_all(bind=engine)
Base.metadata.create_all(bind=engine)

settings = get_settings()

app = FastAPI(
    title=settings.app_name,
    description=settings.app_description,
)

# Include routers
app.include_router(bugs.router)
app.include_router(users.router)
