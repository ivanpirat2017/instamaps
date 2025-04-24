from typing import Optional
from pydantic import EmailStr
from app.schemas.base import BaseSchema, TimestampedSchema

class UserBase(BaseSchema):
    email: EmailStr
    username: str
    bio: Optional[str] = None
    avatar_url: Optional[str] = None

class UserCreate(UserBase):
    password: str

class UserUpdate(BaseSchema):
    email: Optional[EmailStr] = None
    username: Optional[str] = None
    password: Optional[str] = None
    bio: Optional[str] = None
    avatar_url: Optional[str] = None

class UserInDBBase(UserBase, TimestampedSchema):
    is_active: bool

class User(UserInDBBase):
    pass

class UserInDB(UserInDBBase):
    hashed_password: str