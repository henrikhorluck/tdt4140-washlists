#!/usr/bin/env bash

python manage.py loaddata Users
python manage.py runserver
