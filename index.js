const express = require('express');
const Socketio = require('socket.io');

const app = express();

const server = app.listen(4000, () => {
    console.log('Server is running on port 4000');
});

const io = Socketio(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});
io.on("connection", (socket) => {
    console.log('Client connected');

    socket.on('error', (error) => {
        console.error('Socket error:', error);
    });

    socket.on('my_event', (data) => {
        console.log('Received data:', data);
        socket.broadcast.emit("message-rec", data);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

