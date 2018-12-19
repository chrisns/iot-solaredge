FROM node:alpine
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm i --silent
COPY index.js .

CMD npm start
