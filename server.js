import express from "express";
import cors from "cors";
import { Server } from "socket.io"; //1.Server from Socket.io
import http from "http";
const app = express();
const server = http.createServer(app);

// 2.io from Socket Server
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "PUT"],
  },
});

// 3.Connection on
io.on("connection", (socket) => {
  console.log(socket.id);
  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User Id:- ${socket.id} Joined Room:- ${data}`);
  });

  socket.on("send_msg", (data) => {
    console.log("send msg", data);
    socket.to(data.room).emit("recieve_msg", data);
  });
  socket.on("disconnect", () => {
    console.log("User Disconnect", socket.id);
  });
});

app.use(cors());

const port = 3000;
server.listen(port, () =>
  console.log(`Server is Running http://localhost:${port}`)
);
