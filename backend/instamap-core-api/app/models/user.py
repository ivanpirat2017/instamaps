from sqlalchemy import Column, String, Boolean
from sqlalchemy.orm import relationship
from app.models.base import Base

class User(Base):
    email = Column(String, unique=True, index=True, nullable=False)
    username = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean(), default=True)
    bio = Column(String, nullable=True)
    avatar_url = Column(String, nullable=True)

    # Отношения
    posts = relationship("Post", back_populates="author")
    comments = relationship("Comment", back_populates="author")