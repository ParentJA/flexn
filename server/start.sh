#!/bin/bash

python ./manage.py migrate
python ./manage.py collectstatic --clear --noinput
# gunicorn --bind 0.0.0.0:8000 flexn.wsgi --workers 3
python ./manage.py runserver 0.0.0.0:8000
