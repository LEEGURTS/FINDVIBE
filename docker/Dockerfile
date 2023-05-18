# base image
FROM node:latest AS build

# client 빌드하기

WORKDIR /app/FindVibe/client

COPY client/package*.json ./

RUN npm install;

COPY client/ ./

RUN npm run build;

# server 켜기

WORKDIR /app/FindVibe/server

COPY server/package*.json ./
COPY server/yarn.lock ./

RUN npm install;
RUN yarn;

COPY server/ ./

ENV NODE_APP=main.js
ENV NODE_ENV = development

WORKDIR /app/FindVibe/upload_images

WORKDIR /app/FindVibe/server

# start the Flask application
CMD ["yarn","server_test"]