#!/usr/bin/env bash

python manage.py loaddata Users groups example-data
python manage.py runserver
