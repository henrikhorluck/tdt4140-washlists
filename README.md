# 28

Studentsamskipnaden i fredrikstad vaskelister - SIF vaskelister


## Running the django server

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
Add description here
