# socket.io-server-redis
A socket.io server that talks to a redis backend

# Docker
The image lives here:
https://hub.docker.com/r/mitchseymour/socket.io-server-redis/

## Building
```bash
$ docker build -t mitchseymour/socket.io-server-redis:0.1.0 .
```

## Running
First, you need a redis instance running somewhere. A simple way to do this is with the official redis image:
```bash
$ docker run --net=host \
    -p "6379:6379" \
    -ti redis:4.0.1
```

Next, run the socket.io server, and point it at our redis instance.
```bash
$ docker run \
  -e REDIS_HOST=127.0.0.1 \
  -e REDIS_PORT=6379 \
  -e CHANNELS=channelone,channeltwo \
  -ti mitchseymour/socket.io-server-redis:0.1.0
```
