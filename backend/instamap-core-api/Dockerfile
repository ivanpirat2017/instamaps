FROM python:3.11-slim

WORKDIR /app

# Установка системных зависимостей
RUN apt-get update && apt-get install -y \
    gcc \
    libpq-dev \
    gdal-bin \
    libgdal-dev \
    netcat-traditional \
    && rm -rf /var/lib/apt/lists/*

# Установка poetry
RUN pip install poetry

# Копирование файлов зависимостей
COPY pyproject.toml poetry.lock ./

# Установка зависимостей
RUN poetry config virtualenvs.create false \
    && poetry install --no-interaction --no-ansi

# Копирование исходного кода
COPY . .

# Делаем скрипт запуска исполняемым
RUN chmod +x /app/scripts/start.sh

# Запуск приложения через скрипт
CMD ["/app/scripts/start.sh"]