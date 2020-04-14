FROM python:3.8

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE FALSE
ENV POETRY_VIRTUALENVS_CREATE FALSE
ENV PRODUCTION True
ARG DB_PASSWORD=hunter2

RUN mkdir /code

WORKDIR /code

COPY poetry.lock pyproject.toml /code/

RUN pip install poetry && \
    poetry install --no-dev

COPY . /code/

CMD ["bash"]