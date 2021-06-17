# get node slim
FROM node:14.17.0-slim

# copy entire dir
ADD . /foodex2sca_front

# set working direcrory
WORKDIR /foodex2sca_front

# install dependencies
RUN npm i --production --silent .

# start server
EXPOSE 8081
CMD ["./node_modules/.bin/polymer", "serve", "-H", "0.0.0.0"]