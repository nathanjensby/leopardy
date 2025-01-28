const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

app.use(cors({
  origin: 'https://leopardy.netlify.app', 
  // origin: 'http://localhost:5173',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

const io = new Server(server, {
  cors: {
    origin: "https://leopardy.netlify.app", 
    // origin: 'http://localhost:5173',
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  }
});

let buzzes = [];

io.on("connection", (socket) => {
  console.log(`Player connected: ${socket.id}, Transport: ${socket.conn.transport.name}`);
  

  socket.on("buzz", ({ playerName }) => {
    if (buzzes.length < 3 && !buzzes.includes(playerName)) {
      buzzes.push(playerName)
      io.emit("buzzed", { playerName: playerName });
    }
  });

  socket.on("openBuzzers", () => {
    console.log('openBuzzers happened')
    io.emit("buzzerOpen");
  });

  socket.on("closeBuzzers", () => {
    buzzes = [];
    io.emit("buzzerClosed")
  })

  socket.on("disconnect", () => {
    console.log(`Player disconnected: ${socket.id}`);
    io.emit('disconnected', { socketId: socket.id })
  });
});

app.get("/", (req, res) => {
  res.send("Buzzer system backend is running.");
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
