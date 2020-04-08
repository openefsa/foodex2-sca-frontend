FROM node:13.10.1

RUN mkdir /app
WORKDIR /app
COPY package.json /app

RUN npm install .

# (only debug) Inform Docker that the container is listening on the specified port at runtime.
# EXPOSE 8081

COPY . /app

CMD ["/app/node_modules/.bin/polymer", "serve", "-H", "0.0.0.0"]
