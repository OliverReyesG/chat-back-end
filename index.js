const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors")
const server = http.createServer(app);
app.use(cors());

const port = process.env.PORT || 3001

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "http://localhost:3002", "https://62d0dc4b4438f93bae3180d5--aesthetic-pothos-3a2c06.netlify.app", "https://oliverreyeschat.netlify.app"],
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


server.listen(port, () => {
    console.log("Server listening on port: 3001")
})
