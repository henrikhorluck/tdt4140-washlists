FROM python:3.8

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE FALSE
ENV POETRY_VIRTUALENVS_CREATE FALSE
ENV PRODUCTION True

RUN mkdir /code

WORKDIR /code

COPY poetry.lock pyproject.toml /code/

RUN pip install poetry && \
    poetry install

COPY . /code/

EXPOSE 8000

CMD ["bash"]
