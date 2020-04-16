FROM python:3.8

LABEL maintainer="Henrik Hørlück Berg <henrik@horluck.no>"

ENV PYTHONUNBUFFERED 1
ENV POETRY_VIRTUALENVS_CREATE FALSE

WORKDIR /code

COPY . .

RUN pip install poetry && poetry install

EXPOSE 8000

CMD ["bash"]
