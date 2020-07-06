# FROM node:alpine
FROM node:slim
# FROM node:12.18.2-slim

ENV NODE_ENV production

WORKDIR /usr/src/app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm i --production --silent .

COPY . .

EXPOSE 8081

CMD ["./node_modules/.bin/polymer", "serve", "-H", "0.0.0.0"]