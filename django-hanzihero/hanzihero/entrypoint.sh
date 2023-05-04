#!/bin/sh

if [ "$DATABASE" = "postgres" ]
then
    echo "Waiting for postgres..."

    while ! nc -z $SQL_HOST $SQL_PORT; do
      sleep 1
    done

    echo "PostgreSQL started"
fi
sleep 5
python hanzihero/manage.py flush --no-input
python hanzihero/manage.py migrate

exec "$@"

