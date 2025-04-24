FROM postgis/postgis:15-3.3

# Установка локали
RUN localedef -i ru_RU -c -f UTF-8 -A /usr/share/locale/locale.alias ru_RU.UTF-8

# Установка переменных окружения
ENV LANG ru_RU.utf8
ENV POSTGRES_USER instamaps
ENV POSTGRES_PASSWORD instamaps
ENV POSTGRES_DB instamaps
ENV PGDATA /var/lib/postgresql/data/pgdata

# Копирование скриптов инициализации
COPY ./init-scripts/ /docker-entrypoint-initdb.d/

# Создание директории для данных с правильными правами
RUN mkdir -p /var/lib/postgresql/data/pgdata && \
    chown -R postgres:postgres /var/lib/postgresql/data/pgdata