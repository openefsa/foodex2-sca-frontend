FROM node:13.10.1

RUN mkdir /app
WORKDIR /app
COPY package.json /app

RUN npm install .

COPY . /app

CMD ["/app/node_modules/.bin/polymer", "serve", "-H", "0.0.0.0"]
