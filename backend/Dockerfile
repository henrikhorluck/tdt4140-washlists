FROM python:3.8

LABEL maintainer="Henrik Hørlück Berg <henrik@horluck.no>"

ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=FALSE \
    POETRY_VIRTUALENVS_CREATE=FALSE \
    PRODUCTION=True

WORKDIR /code

COPY . .

RUN pip install poetry && poetry install

EXPOSE 8000

CMD ["bash"]
