FROM node:alpine as builder
RUN apk add --no-cache git
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm i --production --silent

COPY index.js .
USER node
CMD npm start
