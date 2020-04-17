# 28 — SIF Washlists
<a href="https://github.com/psf/black"><img alt="Code style: black" src="https://img.shields.io/badge/code%20style-black-000000.svg"></a>
[![pipeline status](https://gitlab.stud.idi.ntnu.no/tdt4140-2020/28/badges/dev/pipeline.svg)](https://gitlab.stud.idi.ntnu.no/tdt4140-2020/28/-/commits/dev)
[![coverage report](https://gitlab.stud.idi.ntnu.no/tdt4140-2020/28/badges/dev/coverage.svg)](https://gitlab.stud.idi.ntnu.no/tdt4140-2020/28/-/commits/dev)


This is a web based system for organising cleaning via shared cleaning list. 
Designed and developed for "Studentsamskipnaden i fredrikstad SIF", a student housing organization in Fredrikstad. 

An image of the login page

![](/uploads/855ef9c2f8fb3b0b9fad9521a9f8c2a0/image.png)

Below is a quick start guide on how to run the web applications backend and frontend. Be sure to check out the 
[`wiki`](https://gitlab.stud.idi.ntnu.no/tdt4140-2020/28/-/wikis/home) for more detailed documentation.

## Basic architecture description

The cleaning organising system is a web application. It consists of a [`django backend`](https://www.djangoproject.com/)
using a SQLite database managment system, which provides a REST-API, that the frontend uses for persistence, and logic.
The frontend uses [react](https://reactjs.org/), with [Next.js](https://nextjs.org).

The frontend code is in the [`frontend folder`](https://gitlab.stud.idi.ntnu.no/tdt4140-2020/28/-/tree/dev/frontend).
The backend code is in the [`backend folder`](https://gitlab.stud.idi.ntnu.no/tdt4140-2020/28/-/tree/dev/backend).

## Running the backend

Following are the instructions for installing the dependencies and running the backend.
The instructions are for a linux based operating system, but should be similar for other operating systems.

### Prerequisits

Django is written in Python, you can use any 3.8.* version of python. You can download it
from Python's [website](https://www.python.org/downloads/). 
We also recommend installing the project dependencies in a virtual environment, like [pyenv-virtualenv](https://github.com/pyenv/pyenv-virtualenv).

Once you have verified that you have a valid version of Python available (`python --version` prints 3.8.*). You need to 
install [Poetry](https://python-poetry.org), which can be done through Python standard package installer pip, or any of
the methods listed on Poetry's website:
```
pip install poetry
```

Poetry is our choice of dependency management system for our backend, since it has an intuitive CLI, and supports lockfiles.

### Install dependencies

All commands from here and below assume you are in the `backend`-directory, which you can navigate to using:

```bash
cd backend
```

The dependencies for the backend are specificed in `/backend/pyproject.toml`. Here we specify which dependencies 
the project depends on, and which range of version are valid. At any given time, the version is locked to a specific
version, which is listed in `backend/poetry.lock`.
   
To install the dependencies (django, djangorestframework, and more), run the following: 

```bash
poetry install
```

### Migrating the database

Now we should be able to run django. To set up the database tables we must first apply the migrations. To do this run

```
python manage.py migrate
```

### Running the server

We have created a script, `run.sh` to help the set up process. The script loads initial data into the database, so that,
you can start developing faster, or if you just want a working backend when working in the frontend. For how it is done,
see the [docs](https://docs.djangoproject.com/en/3.0/howto/initial-data/). After loading the inital data, it starts the
server, with the command `python manage.py runserver`. To execute the script: 

```
./run.sh
```

The project should then be live at `http://localhost:8000`. The admin site, to manage the data is located in `/admin`. 
You can browse the available API at `/api` after first logging into the admin site. Credentials for the supplied users 
lie in `backend/fixtures/testdata.yaml` as comments to the password-field on each user. Do note only the users with 
`is_staff = true` can access the admin site, and it varies how much they have access to. For local development the user 
`admin`, with password `admin` is usually sufficient for backend development.

## How to run the frontend

> We here assume that you have the backend running on `localhost:8000`, and have loaded the supplied fixtures.
If that is _not_ the case, you will have to set a list of environment-variables, which can all be found on the bottom of
this README. The environment-variables need to be set, so that the application knows which backend it should communicate
with, and where. That should **not** be necessary for local development.

As with the backend, all commands from here and below assume you are located in the `frontend`-directory, which you can 
navigate to using:

```bash
cd frontend
```

### Prerequisits
We assume that you have version of `node` >= 12 installed, and that the Node package manager, `npm`, is in your PATH.
You can install Node from their [website](https://nodejs.org). 

### Install dependencies
We first need to install our dependencies, consisting mostly of React and Next.js. You can install them by running:

```bash
npm install
``` 

### Start the front end
Once you have the dependencies install, you can start the frontend in development mode:

```bash
npm run dev
```

The website should then be available from [http://localhost:3000](http://localhost:3000) in your browser. If you make
any changes to the code, it will hot-reload.

#### Production
To run in prodction mode, you will instead need to first build the project, before starting the server in production
mode which is done using the following commands:

```bash
npm run build
npm run start
```

This is normally not needed for local development, but can be useful if you are trying to test e.g. serverside rendering.

## Testing

To run the unittests in the backend run the following command in the `backend`-directory, if you have installed the 
dependencies:

```bash
python manage.py test
```

For code coveage, run the following when in `backend`:

```bash
coverage run manage.py test
coverage report
```

You can run the frontend tests with this command, when in the `frontend`-directory:

```bash
npm run test
```

This also prints code coverage.

## Available environment variables

Here is a list of variables you can use to configure the application. You **should not** need to change any of them
for the application to run locally. They are mostly necessary when deployment is set up.

### Frontend

Most of these variables are so that the frontend knows _which_ backend it should communicate to.

<dl>
    <dt><code>SIF_BACKEND_CLIENT_ID</code></dt>
        <dd>Related to OAuth authorization.You can get the values by  
        registering an application at <code>&lt;backend-domain&gt;/o/applications/register/</code> when the backed is
        running, the default domain for local development is <code>http://localhost:8000</code>. See #41 for an 
        explanation with images. See <code>django-oauth-toolkit</code>'s <a href="https://django-oauth-toolkit.readthedocs.io/en/latest/rest-framework/getting_started.html#step-3-register-an-application">docs</a> for details. 
        </dd>
    <dt><code>SIF_BACKEND_CLIENT_SECRET</code></dt>
        <dd>Also used for OAuth authorization. See SIF_BACKEND_CLIENT_ID. See above.</dd>
    <dt><code>SIF_BACKEND_DOMAIN</code></dt>
        <dd>
        The domain the backend is running on. Defaults to <a href="http://localhost:8000">http://localhost:8000</a> unless overriden.
        </dd>
    <dt><code>SIF_DOMAIN</code></dt>
        <dd>
        The domain the frontend is running on. Defaults to <a href="http://localhost:3000">http://localhost:3000</a> unless overriden.
        </dd>
</dl>

### Backend

You **should not** need to touch 
Used for [Django-settings](https://gitlab.stud.idi.ntnu.no/tdt4140-2020/28/-/blob/dev/backend/sif_vaskelister/settings.py).

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
    <dd>We use <a href="https://python-poetry.org">Poetry</a> for dependency management, which autmatically sets up a virtualenv, but when we run the frontend in Docker, that is not necessary.</dd>
  <dt><code>PYTHONUNBUFFERED</code></dt>
    <dd>Ensures Python prints to stdout, seee e.g. <a href="https://stackoverflow.com/questions/29663459/python-app-does-not-print-anything-when-running-detached-in-docker">this</a> Stack Overflow question.</dd> 
</dl>