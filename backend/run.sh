#!/usr/bin/env bash

python manage.py loaddata fixtures/testdata.yaml
python manage.py runserver 0.0.0.0:8000
