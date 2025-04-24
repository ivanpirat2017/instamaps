from sqlalchemy import Column, String, ForeignKey, Integer
from sqlalchemy.orm import relationship
from geoalchemy2 import Geometry
from app.models.base import Base

class Post(Base):
    title = Column(String, nullable=True)
    description = Column(String, nullable=True)
    image_url = Column(String, nullable=False)
    author_id = Column(Integer, ForeignKey("user.id"), nullable=False)
    location = Column(Geometry(geometry_type='POINT', srid=4326))
    
    # Отношения
    author = relationship("User", back_populates="posts")
    comments = relationship("Comment", back_populates="post", cascade="all, delete-orphan")
    tags = relationship("Tag", secondary="post_tags", back_populates="posts")

class Comment(Base):
    content = Column(String, nullable=False)
    author_id = Column(Integer, ForeignKey("user.id"), nullable=False)
    post_id = Column(Integer, ForeignKey("post.id"), nullable=False)
    
    # Отношения
    author = relationship("User", back_populates="comments")
    post = relationship("Post", back_populates="comments")

class Tag(Base):
    name = Column(String, unique=True, nullable=False)
    posts = relationship("Post", secondary="post_tags", back_populates="tags")

# Таблица связи многие-ко-многим для постов и тегов
from sqlalchemy import Table, Column
post_tags = Table(
    "post_tags",
    Base.metadata,
    Column("post_id", Integer, ForeignKey("post.id"), primary_key=True),
    Column("tag_id", Integer, ForeignKey("tag.id"), primary_key=True)
)