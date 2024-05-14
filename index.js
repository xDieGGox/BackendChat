const http = require("http");
const express = require("express");
const cors = require("cors");
const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server, {
cors: {
    origin: '*',
    methods: ['GET', 'POST' ]
}
});

const mensajesrecibidos = []

// Manejar conexiones de Socket.IO
io.on('connection', (socket) => {
    console.log('Nuevo usuario conectado');

    // Manejar eventos de mensaje
    socket.on('mensaje-enviado', (mensaje) => {
        console.log('Mensaje recibido:', mensaje);
        mensajesrecibidos.push(mensaje);
        
        // Transmitir el mensaje a todos los clientes conectados
        //io.emit('mensaje-texto', mensaje);
        socket.emit('mensaje-texto', mensajesrecibidos);
        socket.broadcast.emit('mensaje-texto', mensajesrecibidos);
    });

    // Manejar eventos de desconexión
    socket.on('disconnect', () => {
        console.log('Usuario desconectado');
    });
});

app.use(cors());
app.get('/', (req, res) => {
    res.send('Chat Server is running');
});

const PORT = process.env.PORT || 3000;
server. listen(PORT, () => {
    console. log("SERVER IS UP")
});