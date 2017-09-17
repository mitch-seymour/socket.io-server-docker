FROM node:8.0

LABEL maintainer "mitchseymour@gmail.com"

ENV REDIS_HOST=127.0.0.1
ENV REDIS_PORT=6379
ENV CHANNELS=test
ENV LOG_EVENTS=true

# Copy the dependencies
ADD package.json /tmp/package.json
RUN cd /tmp && yarn install
RUN mkdir -p /opt/socket.io-server && cp -a /tmp/node_modules /opt/socket.io-server/

# Build
WORKDIR /opt/socket.io-server
ADD . /opt/socket.io-server

EXPOSE 3000 

# Start the app
CMD yarn run start
