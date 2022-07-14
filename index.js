const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors")
const server = http.createServer(app);
app.use(cors());

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "http://localhost:3002"],
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User connected with id: ${socket.id}`)
  socket.on("join_room", (data) => {
    socket.join(data)
    console.log(`User ${socket.id} joined the room: ${data}`)
  })


  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data)
  })

  
  socket.on("disconnect", ()=>{
    console.log(`User: ${socket.id} got disconnected`)
  })
})


server.listen(3001, () => {
    console.log("Server listening on port: 3001")
})
