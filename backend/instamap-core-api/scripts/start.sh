#!/bin/bash
set -e

echo "Waiting for PostgreSQL..."
# Ожидание доступности PostgreSQL с использованием переменных окружения
until pg_isready -h "$PGHOST" -U "$PGUSER"; do
  echo "PostgreSQL is unavailable - sleeping"
  sleep 1
done

echo "PostgreSQL is up and running!"

# Применяем миграции
echo "Running database migrations..."
alembic upgrade head

# Запускаем приложение
echo "Starting FastAPI application..."
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload