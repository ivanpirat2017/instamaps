from typing import Optional, List, Tuple
from pydantic import BaseModel
from app.schemas.base import BaseSchema, TimestampedSchema
from app.schemas.user import User

class GeoPoint(BaseModel):
    latitude: float
    longitude: float

class CommentBase(BaseSchema):
    content: str

class CommentCreate(CommentBase):
    post_id: int

class Comment(CommentBase, TimestampedSchema):
    author: User
    post_id: int

class TagBase(BaseSchema):
    name: str

class Tag(TagBase, TimestampedSchema):
    pass

class PostBase(BaseSchema):
    title: Optional[str] = None
    description: Optional[str] = None
    image_url: str
    location: GeoPoint
    tags: List[str] = []

class PostCreate(PostBase):
    pass

class PostUpdate(BaseSchema):
    title: Optional[str] = None
    description: Optional[str] = None
    image_url: Optional[str] = None
    location: Optional[GeoPoint] = None
    tags: Optional[List[str]] = None

class Post(PostBase, TimestampedSchema):
    author: User
    comments: List[Comment] = []
    tags: List[Tag] = []

class PostInDB(Post):
    author_id: int