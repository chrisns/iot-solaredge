FROM node:16.8.0-alpine3.13 as builder
RUN apk add --no-cache git
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm i --production --silent

COPY index.js .
USER node
CMD npm start
