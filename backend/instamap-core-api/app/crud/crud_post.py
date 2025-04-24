from typing import List, Optional
from sqlalchemy.orm import Session
from geoalchemy2.functions import ST_DWithin
from geoalchemy2.shape import from_shape
from shapely.geometry import Point
from app.crud.base import CRUDBase
from app.models.post import Post, Tag
from app.schemas.post import PostCreate, PostUpdate

class CRUDPost(CRUDBase[Post, PostCreate, PostUpdate]):
    def create_with_owner(
        self, db: Session, *, obj_in: PostCreate, owner_id: int
    ) -> Post:
        # Создаем точку из координат
        point = Point(obj_in.location.longitude, obj_in.location.latitude)
        
        # Создаем пост
        db_obj = Post(
            title=obj_in.title,
            description=obj_in.description,
            image_url=obj_in.image_url,
            location=from_shape(point, srid=4326),
            author_id=owner_id
        )
        db.add(db_obj)
        
        # Добавляем теги
        for tag_name in obj_in.tags:
            tag = db.query(Tag).filter(Tag.name == tag_name).first()
            if not tag:
                tag = Tag(name=tag_name)
                db.add(tag)
            db_obj.tags.append(tag)
        
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def get_multi_by_owner(
        self, db: Session, *, owner_id: int, skip: int = 0, limit: int = 100
    ) -> List[Post]:
        return (
            db.query(self.model)
            .filter(Post.author_id == owner_id)
            .offset(skip)
            .limit(limit)
            .all()
        )

    def get_by_location(
        self,
        db: Session,
        *,
        latitude: float,
        longitude: float,
        distance_meters: float = 1000,
        skip: int = 0,
        limit: int = 100
    ) -> List[Post]:
        # Создаем точку из координат
        point = Point(longitude, latitude)
        return (
            db.query(self.model)
            .filter(
                ST_DWithin(
                    Post.location,
                    from_shape(point, srid=4326),
                    distance_meters
                )
            )
            .offset(skip)
            .limit(limit)
            .all()
        )

    def get_by_tags(
        self, db: Session, *, tags: List[str], skip: int = 0, limit: int = 100
    ) -> List[Post]:
        return (
            db.query(self.model)
            .filter(Post.tags.any(Tag.name.in_(tags)))
            .offset(skip)
            .limit(limit)
            .all()
        )

post = CRUDPost(Post)