FROM node:lts as Builder

ARG SIF_BACKEND_DOMAIN
ARG SIF_DOMAIN

WORKDIR /usr/src/app

COPY . .

RUN npm install --pure-lockfile

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
