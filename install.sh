#!/usr/bin/env bash

virtualenv -p python3 django_frw
cd django_frw
git clone https://github.com/sztyui/django_rfw
source bin/activate
pip install -r trains/requirements.txt

python trains/manage.py makemigrations
python trains/manage.py migrate
python trains/manage.py migrate --run-syncdb

python trains/manage.py runserver