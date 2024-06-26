const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

app.use(cors());

app.use("/",(req,res)=>{
    res.send("server is running!");
});

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    console.log(`user connected : ${socket.id}`);

    socket.on("join-room", (data) => {
        socket.join(data);
        console.log(`User: ${socket.id} joined Room: ${data}`);
    });

    socket.on("send-message", (data) => {
        console.log(data);
        socket.to(data.room).emit("receive-message", data);
    });

    socket.on("disconnect", () => {
        console.log("user disconnected", socket.id);
    });
});

server.listen(3005, () => { console.log("running on 3005"); });