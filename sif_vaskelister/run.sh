#!/usr/bin/env bash

python manage.py loaddata Users groups
python manage.py runserver
