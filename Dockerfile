# get node slim
FROM node:14.16.1-slim

# Copy current directory into /app
ADD . /foodex2sca_front

# Set working direcrory
WORKDIR /foodex2sca_front

# create polymer build
RUN npm i --production --silent .

# start server
WORKDIR /foodex2sca_front
EXPOSE 8081
CMD ["./node_modules/.bin/polymer", "serve", "-H", "0.0.0.0"]