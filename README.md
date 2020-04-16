# 28
<a href="https://github.com/psf/black"><img alt="Code style: black" src="https://img.shields.io/badge/code%20style-black-000000.svg"></a>
[![pipeline status](https://gitlab.stud.idi.ntnu.no/tdt4140-2020/28/badges/dev/pipeline.svg)](https://gitlab.stud.idi.ntnu.no/tdt4140-2020/28/-/commits/dev)
[![coverage report](https://gitlab.stud.idi.ntnu.no/tdt4140-2020/28/badges/dev/coverage.svg)](https://gitlab.stud.idi.ntnu.no/tdt4140-2020/28/-/commits/dev)


This is a web based system for organising cleaning via shared cleaning list. 
The system is designed and developed for "Studentsamskipnaden i fredrikstad SIF" a student housing organization in Fredrikstad. 

An image of the login page

![](/uploads/855ef9c2f8fb3b0b9fad9521a9f8c2a0/image.png)

## Basic architecture description
The cleaning organising system is web application. It is split into a [`django back-end`](https://www.djangoproject.com/) using a SQLite database managment system, and a [`react front-end`](https://reactjs.org/).

The front-end code is located in the [`frontend folder`](https://gitlab.stud.idi.ntnu.no/tdt4140-2020/28/-/tree/dev/frontend%2Fsif_vaskelister).
The back-end code is located in the [`sif_vaskelister folder`](https://gitlab.stud.idi.ntnu.no/tdt4140-2020/28/-/tree/dev/sif_vaskelister).

## Running the django server
The instructions for installing python + the backend project dependencies are for a linux based operating system.
### Installing python in a virtualenvironment
First, install python 3.8 and create a virtual environment
```
curl -L https://github.com/pyenv/pyenv-installer/raw/master/bin/pyenv-installer | bash
pyenv update
```
Install deps needed for python 3.8
```
sudo apt install -y make build-essential libssl-dev zlib1g-dev libbz2-dev \
libreadline-dev libsqlite3-dev wget curl llvm libncurses5-dev libncursesw5-dev \
xz-utils tk-dev libffi-dev liblzma-dev python-openssl
```
Install python 3.8.1
```
pyenv install 3.8.1
```
Make a virtual environment and activate it (activate the virtual environment whenever you want to interact with the django project)
```
pyenv virtualenv 3.8.1 pu_django
pyenv activate pu_django
```


### Install dependencies with poetry
We use poetry to manage the dependencies of the python project for the backend. To install dependencie via poetry, first install poetry(with the virtualenv from last section active):
```
pip install poetry
```
The dependencies of the project are defined in `/28/sif_vaskelister/pyproject.toml`. There is also a lockfile that specifies a specific version of the packages used in the project. We can install dependencies from the lockfile by running poetry install from the `/28/sif_vaskelister/` directory (where the pyproject.toml file is). 
```
poetry install
```
### Migrate database
Now we should be able to run django. To set up the database tables we must migrate the database, to do this run
```
python manage.py migrate
```

### Run django
For running django there is a script called `/28/sif_vaskelister/run.sh`. All this script does is that is pre-loads the database with some usefull data using fixtures, then it runs `python manage.py runserver`. Thus you can run the django server by doing
```
./run.sh
```
Now the backend should be running at http://127.0.0.1:8000/admin/

## Running the frontend
Add instructions for running front end here!

## Available environment variables

### Frontend

<dl>
    <dt><code>SIF_BACKEND_CLIENT_ID</code></dt>
        <dd>Related to OAuth authorization.You can get the values by  
        registering an application at <code>&lt;backend-domain&gt;/o/applications/register/</code> when the backed is running, the 
        default domain for local development is <code>http://localhost:8000</code>. See #41 for an explanation with images. 
        </dd>
    <dt><code>SIF_BACKEND_CLIENT_SECRET</code></dt>
        <dd>Also used for OAuth authorization. See SIF_BACKEND_CLIENT_ID</dd>
    <dt><code>SIF_BACKEND_DOMAIN</code></dt>
        <dd>The domain the backend is running on. Defaults to <a href="http://localhost:8000">http://localhost:8000</a> unless overriden.</dd>
    <dt><code>SIF_DOMAIN</code></dt>
        <dd>The domain the frontend is running on. Defaults to <a href="http://localhost:3000">http://localhost:3000</a> unless overriden.</dd>
</dl>

### Backend

These values are mostly used for [Django-settings](https://gitlab.stud.idi.ntnu.no/tdt4140-2020/28/-/blob/dev/backend/sif_vaskelister/settings.py).

<dl>
  <dt><code>DJANGO_SECRET_KEY</code></dt>
    <dd>See Django's <a href="https://docs.djangoproject.com/en/3.0/ref/settings/#std:setting-SECRET_KEY">docs</a>.</dd>
  <dt><code>DJANGO_DEBUG_MODE</code></dt>
    <dd>Sets Django debug mode. Defaults to <code>true</code>, set it to any other value to deactivate debug-mode.</dd>
  <dt><code>DJANGO_ALLOWED_HOSTS</code></dt>
    <dd>Says which host/domain names the backend can run from, see Django <a href="https://docs.djangoproject.com/en/3.0/ref/settings/#allowed-hosts">docs</a>. Defaults to "*", which means any.</dd>
  <dt><code>DJANGO_CORS_ORIGIN_ALLOW_ALL</code></dt>
    <dd>Practically sets if CORS is enabled or disabled, helpful during development. See django-cors-headers <a href="https://github.com/adamchainz/django-cors-headers#configuration">docs</a>.
  For production setup, an environment variable for <code>CORS_ORIGIN_WHITELIST</code> should be set up.</dd>
  <dt><code>POETRY_VIRTUALENVS_CREATE</code></dt>
    <dd>We use <a href="https://python-poetry.org">Poetry</a> for dependency management, which autmatically uses a virtualenv, when we run the frontend in Docker, that is not necessary.</dd>
  <dt><code>PYTHONUNBUFFERED</code></dt>
    <dd>Ensures Python prints to stdout, seee e.g. <a href="https://stackoverflow.com/questions/29663459/python-app-does-not-print-anything-when-running-detached-in-docker">this</a> Stack OVerflow question</dd> 
</dl>