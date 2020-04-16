FROM node:lts as Builder

LABEL maintainer="Henrik Hørlück Berg <henrik@horluck.no>"

ARG SIF_BACKEND_DOMAIN
ARG SIF_DOMAIN

WORKDIR /usr/src/app

COPY . .

RUN npm install --pure-lockfile

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
