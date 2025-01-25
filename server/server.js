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
  },
  transports: ['websocket']
});

// Store state to track who buzzed first
let firstBuzz = null;

io.on("connection", (socket) => {
  console.log(`Player connected: ${socket.id}, Transport: ${socket.conn.transport.name}`);
  

  socket.on("buzz", (data) => {
    console.log('buzzed: ', data);
    if (!firstBuzz) {
      firstBuzz = data.playerName;
      io.emit("buzzed", { playerName: data.playerName });
    }
  });

  socket.on("reset", () => {
    console.log('reset happened')
    firstBuzz = null;
    io.emit("reset");
  });

  socket.on("disconnect", () => {
    console.log(`Player disconnected: ${socket.id}`);
  });
});

app.get("/", (req, res) => {
  res.send("Buzzer system backend is running.");
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
