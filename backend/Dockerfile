FROM python:3.8

LABEL maintainer="Henrik Hørlück Berg <henrik@horluck.no>

ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=FALSE \
    POETRY_VIRTUALENVS_CREATE=FALSE \
    PRODUCTION=True

RUN mkdir /code

WORKDIR /code

COPY poetry.lock pyproject.toml /code/

RUN pip install poetry && \
    poetry install

COPY . /code/

EXPOSE 8000

CMD ["bash"]
