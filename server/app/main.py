from fastapi import FastAPI
from fastapi.exceptions import HTTPException, RequestValidationError
from fastapi.middleware.cors import CORSMiddleware

from app.models import User, Bug
from app.config import get_settings
from app.database import Base, engine
from app.routers import bugs
from app.routers import users
from app.routers import comments
from app.utils.exceptions import http_exception_handler, validation_exception_handler
from app.routers import auth
from app.routers import project

settings = get_settings()

app = FastAPI(
    title=settings.app_name,
    description=settings.app_description,
)

# Add CORS middleware
origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_exception_handler(RequestValidationError, validation_exception_handler)
app.add_exception_handler(HTTPException, http_exception_handler)

# Include routers
app.include_router(bugs.router)
app.include_router(users.router)
app.include_router(comments.router)
app.include_router(auth.router)
app.include_router(project.router)
