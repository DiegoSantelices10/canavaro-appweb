import express from "express";
import http from "http";
import morgan from "morgan";
import { Server as SocketServer } from "socket.io";
import cors from "cors";





const PORT = 5000
// Initializations
const app = express();
const server = http.createServer(app);
const io = new SocketServer(server, {
    cors: { origin: 'http://localhost:3000' },
});

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));


io.on("connection", (socket) => {
    console.log('********************');
    console.log('usuario conectado', socket.id);
    console.log('====================');
    socket.on("enviar-pedido", (body) => {
        socket.broadcast.emit("pedidos", body);
    });

    socket.on("enviar-liberado", (body) => {
        socket.emit("liberado", body);
    });

    socket.on("disconnect", () => {
        console.log("A user disconnected:", socket.id);
    });
});

server.listen(PORT);
console.log(`server on port ${PORT}`);