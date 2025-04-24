#!/bin/bash

# Ждем, пока база данных будет готова
echo "Waiting for PostgreSQL..."
while ! nc -z postgres 5432; do
  sleep 0.1
done
echo "PostgreSQL started"

# Применяем миграции
echo "Running database migrations..."
alembic upgrade head

# Запускаем приложение
echo "Starting FastAPI application..."
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload