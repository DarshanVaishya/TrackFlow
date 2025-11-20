from fastapi import FastAPI
from fastapi.exceptions import HTTPException, RequestValidationError

from app.models import User, Bug
from app.config import get_settings
from app.database import Base, engine
from app.routers import bugs
from app.routers import users
from app.routers import comments
from app.utils.exceptions import http_exception_handler, validation_exception_handler
from app.routers import auth

# Create database tables
# Base.metadata.drop_all(bind=engine)
Base.metadata.create_all(bind=engine)

settings = get_settings()

app = FastAPI(
    title=settings.app_name,
    description=settings.app_description,
)

app.add_exception_handler(RequestValidationError, validation_exception_handler)
app.add_exception_handler(HTTPException, http_exception_handler)

# Include routers
app.include_router(bugs.router)
app.include_router(users.router)
app.include_router(comments.router)
app.include_router(auth.router)
