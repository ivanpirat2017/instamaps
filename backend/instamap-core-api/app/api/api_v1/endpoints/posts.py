from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app import crud
from app.api import deps
from app.schemas.post import Post, PostCreate, PostUpdate
from app.models.user import User

router = APIRouter()

@router.get("/", response_model=List[Post])
def read_posts(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Получить список постов.
    """
    return crud.post.get_multi(db, skip=skip, limit=limit)

@router.post("/", response_model=Post)
def create_post(
    *,
    db: Session = Depends(deps.get_db),
    post_in: PostCreate,
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Создать новый пост.
    """
    post = crud.post.create_with_owner(
        db=db, obj_in=post_in, owner_id=current_user.id
    )
    return post

@router.get("/by-location", response_model=List[Post])
def read_posts_by_location(
    *,
    db: Session = Depends(deps.get_db),
    latitude: float = Query(..., description="Широта"),
    longitude: float = Query(..., description="Долгота"),
    distance: float = Query(1000, description="Радиус поиска в метрах"),
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Получить посты в заданном радиусе от точки.
    """
    posts = crud.post.get_by_location(
        db=db,
        latitude=latitude,
        longitude=longitude,
        distance_meters=distance,
        skip=skip,
        limit=limit,
    )
    return posts

@router.get("/by-tags", response_model=List[Post])
def read_posts_by_tags(
    *,
    db: Session = Depends(deps.get_db),
    tags: List[str] = Query(..., description="Список тегов для поиска"),
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Получить посты по тегам.
    """
    posts = crud.post.get_by_tags(db=db, tags=tags, skip=skip, limit=limit)
    return posts

@router.get("/{id}", response_model=Post)
def read_post(
    *,
    db: Session = Depends(deps.get_db),
    id: int,
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Получить пост по ID.
    """
    post = crud.post.get(db=db, id=id)
    if not post:
        raise HTTPException(status_code=404, detail="Пост не найден")
    return post

@router.put("/{id}", response_model=Post)
def update_post(
    *,
    db: Session = Depends(deps.get_db),
    id: int,
    post_in: PostUpdate,
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Обновить пост.
    """
    post = crud.post.get(db=db, id=id)
    if not post:
        raise HTTPException(status_code=404, detail="Пост не найден")
    if post.author_id != current_user.id:
        raise HTTPException(status_code=403, detail="Недостаточно прав")
    post = crud.post.update(db=db, db_obj=post, obj_in=post_in)
    return post

@router.delete("/{id}", response_model=Post)
def delete_post(
    *,
    db: Session = Depends(deps.get_db),
    id: int,
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Удалить пост.
    """
    post = crud.post.get(db=db, id=id)
    if not post:
        raise HTTPException(status_code=404, detail="Пост не найден")
    if post.author_id != current_user.id:
        raise HTTPException(status_code=403, detail="Недостаточно прав")
    post = crud.post.remove(db=db, id=id)
    return post