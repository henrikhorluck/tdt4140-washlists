# 28
<a href="https://github.com/psf/black"><img alt="Code style: black" src="https://img.shields.io/badge/code%20style-black-000000.svg"></a>
[![pipeline status](https://gitlab.stud.idi.ntnu.no/tdt4140-2020/28/badges/dev/pipeline.svg)](https://gitlab.stud.idi.ntnu.no/tdt4140-2020/28/-/commits/dev)
[![coverage report](https://gitlab.stud.idi.ntnu.no/tdt4140-2020/28/badges/dev/coverage.svg)](https://gitlab.stud.idi.ntnu.no/tdt4140-2020/28/-/commits/dev)


This is a web based system for organising cleaning via shared cleaning list. 
The system is designed and developed for "Studentsamskipnaden i fredrikstad SIF" a student housing organization in Fredrikstad. 

An image of the login page

![](/uploads/855ef9c2f8fb3b0b9fad9521a9f8c2a0/image.png)

## Basic architecture description
The cleaning organising system is a web application. It is split into a [`django backend`](https://www.djangoproject.com/) using a SQLite database managment system, and a [`react frontend`](https://reactjs.org/).

The front-end code is located in the [`frontend folder`](https://gitlab.stud.idi.ntnu.no/tdt4140-2020/28/-/tree/dev/frontend).
The back-end code is located in the [`backend folder`](https://gitlab.stud.idi.ntnu.no/tdt4140-2020/28/-/tree/dev/backend).

## Running the backend

Following are the instructions for installing the dependencies and running the backend django project.
The instructions are for a linux based operating system, but should be similar for other operating systems.

## Install Python 3.8 
First, install python 3.8. See the instructions for installing Python 3.8 at the [Python website](https://www.python.org/downloads/). 
We also recommend installing the project dependencies in a virtual environment, we have good expriences using [pyenv-virtualenv](https://github.com/pyenv/pyenv-virtualenv) for this. 

### Install dependencies with poetry
We use poetry to manage the dependencies of the python project for the backend. To install dependencie via poetry, first install [Poetry](https://python-poetry.org):
```
pip install poetry
```
The dependencies for the backend are specificed in `/backend/pyproject.toml`. There is also a lockfile that specifies a specific version of the packages used in the project 
We can install dependencies from the lockfile by running poetry install from the `/backend` directory (where the pyproject.toml file is). 
```
cd backend
poetry install
```
### Migrate database
Now we should be able to run django. To set up the database tables we must first apply the migrations. To do this run
```
python manage.py migrate
```

### Run django
For running django there is a script called `/backend/run.sh`. All this script does is that is pre-loads the database with some usefull data using fixtures, then it runs `python manage.py runserver`. Thus you can run the django server by running
```
./run.sh
```
Now the backend should be running at http://localhost:8000/admin/ prepopulated with some data for testing the system.

## Running the frontend
To run the front end follow these steps.

First start the django back end with the instructions above. If you do as described above and run the back end via the `run.sh` script the front end will automatically connect with the backend. 

If you run the backend manually withuot the `run.sh` script, or on a different domain than localhost, you must set the `SIF_CLIENT_ID` and `SIF_CLIENT_SECRET` envrionment variables manually. 
This is needed to connect the frontend instance with the backend.
You can see `django-oauth-toolkit`'s [docs](https://django-oauth-toolkit.readthedocs.io/en/latest/rest-framework/getting_started.html#step-3-register-an-application) for details.
The default domain for local development is `http://localhost:8000`. See #41 for an explanation with images of how to create a client id and secret.

## Start the front end

First move to the `/frontend` directory:
```
cd frontend
```

In the `/frontend` directory, run:

```shell
npm run dev
```
This runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
The page will reload if you make edits.

```shell
npm run build
```

```shell
npm run start
```

## Testing

To run the unittests in the backend run the following command from the `/backend`-directory, as long as you have installed all the dependencies:

```bash
python manage.py test
```

For code-coveage, run the following, also from `/backend`:

```bash
coverage run manage.py test
coverage report
```

To run the tests in the frontend, run the following, from the  `/frontend`-directory:
```bash
npm run test
```
Or with code coverage:
```bash
npm run test --coverage
```

## Available environment variables

### Frontend

Most of these variables are so that the frontend knows _which_ backend it should communicate to.

<dl>
    <dt><code>SIF_BACKEND_CLIENT_ID</code></dt>
        <dd>Related to OAuth authorization.You can get the values by  
        registering an application at <code>&lt;backend-domain&gt;/o/applications/register/</code> when the backed is running, the 
        default domain for local development is <code>http://localhost:8000</code>. See #41 for an explanation with images. 
        </dd>
    <dt><code>SIF_BACKEND_CLIENT_SECRET</code></dt>
        <dd>Also used for OAuth authorization. See SIF_BACKEND_CLIENT_ID.</dd>
    <dt><code>SIF_BACKEND_DOMAIN</code></dt>
        <dd>The domain the backend is running on. Defaults to <a href="http://localhost:8000">http://localhost:8000</a> unless overriden.</dd>
    <dt><code>SIF_DOMAIN</code></dt>
        <dd>The domain the frontend is running on. Defaults to <a href="http://localhost:3000">http://localhost:3000</a> unless overriden.</dd>
</dl>

### Backend

These values are primarily used for [Django-settings](https://gitlab.stud.idi.ntnu.no/tdt4140-2020/28/-/blob/dev/backend/sif_vaskelister/settings.py).

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
    <dd>Ensures Python prints to stdout, seee e.g. <a href="https://stackoverflow.com/questions/29663459/python-app-does-not-print-anything-when-running-detached-in-docker">this</a> Stack Overflow question.</dd> 
</dl>