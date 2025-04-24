FROM python:3.11-slim

WORKDIR /app

# Установка системных зависимостей
RUN apt-get update && apt-get install -y \
    gcc \
    libpq-dev \
    gdal-bin \
    libgdal-dev \
    netcat-traditional \
    curl \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*

# Копирование зависимостей и установка их через pip
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Проверка установки основных пакетов
RUN python -c "import sqlalchemy" && \
    python -c "import alembic" && \
    python -c "import fastapi"

# Копирование исходного кода
COPY . .

# Делаем скрипт запуска исполняемым
RUN chmod +x /app/scripts/start.sh

# Переменные окружения для Python и PostgreSQL
ENV PYTHONPATH=/app \
    PYTHONUNBUFFERED=1 \
    PGHOST=postgres \
    PGUSER=instamaps \
    PGPASSWORD=instamaps \
    PGDATABASE=instamaps

# Запуск приложения через скрипт
CMD ["/app/scripts/start.sh"]