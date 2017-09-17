var app = require('express')(),
    http = require('http').Server(app),
    io = require('socket.io')(http),
    Redis = require('ioredis'),
    redis = new Redis(process.env.REDIS_PORT, process.env.REDIS_HOST);
    channels = process.env.CHANNELS.split(",").map((channel) => channel.trim()),
    log_events = process.env.log_events == "true";

console.log('Subscribing to channels: ' + channels);
redis.subscribe(channels, (err, count) => {});

redis.on('message', (channel, message) => {
    let emit_to = channel + ':' + JSON.parse(message).event;
    if (log_events) console.log('Emitting message to: ' + emit_to);
    io.emit(emit_to, message);
});

http.listen(3000, () => console.log('Listening on Port 3000'));
