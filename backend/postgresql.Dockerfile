FROM postgis/postgis:15-3.3

# Установка локали
RUN localedef -i ru_RU -c -f UTF-8 -A /usr/share/locale/locale.alias ru_RU.UTF-8

# Установка переменных окружения
ENV LANG ru_RU.utf8
ENV POSTGRES_DB instamaps
ENV POSTGRES_USER instamaps
ENV POSTGRES_PASSWORD instamaps

# Копирование скриптов инициализации
COPY ./init-scripts/ /docker-entrypoint-initdb.d/

# Настройка PostgreSQL для развития (не использовать в production)
RUN echo "host all  all    0.0.0.0/0  md5" >> /var/lib/postgresql/data/pg_hba.conf
RUN echo "listen_addresses='*'" >> /var/lib/postgresql/data/postgresql.conf