const socketIO = require("socket.io");
const http = require("http");
const express = require("express");
const cors = require("cors");
const app = express();
const server = http.createServer(app);

// Enhanced CORS configuration
app.use(cors({
  origin: [
    "https://ccshop.netlify.app", // Your Netlify frontend
    "http://localhost:3000"       // For local development
  ],
  credentials: true
}));

app.use(express.json());

// WebSocket setup with production-ready configuration
const io = socketIO(server, {
  cors: {
    origin: [
      "https://ccshop.netlify.app",
      "http://localhost:3000"
    ],
    methods: ["GET", "POST"],
    credentials: true
  },
  transports: ['websocket', 'polling'],
  pingTimeout: 60000, // Important for Render's free tier cold starts
  pingInterval: 25000
});

// Health check endpoint
app.get("/", (req, res) => {
  res.send("Crafty Corner Socket Server is running!");
});

// WebSocket connection management
let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (receiverId) => {
  return users.find((user) => user.userId === receiverId);
};

const createMessage = ({ senderId, receiverId, text, images }) => ({
  senderId,
  receiverId,
  text,
  images,
  seen: false,
  timestamp: new Date().toISOString()
});

// Socket.io event handlers
io.on("connection", (socket) => {
  console.log(`New connection: ${socket.id}`);

  // User management
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  // Message handling
  const messages = {};

  socket.on("sendMessage", ({ senderId, receiverId, text, images }) => {
    const message = createMessage({ senderId, receiverId, text, images });
    const user = getUser(receiverId);

    if (!messages[receiverId]) {
      messages[receiverId] = [message];
    } else {
      messages[receiverId].push(message);
    }

    if (user) {
      io.to(user.socketId).emit("getMessage", message);
    }
  });

  // Message status tracking
  socket.on("messageSeen", ({ senderId, receiverId, messageId }) => {
    const user = getUser(senderId);
    
    if (messages[senderId]) {
      const message = messages[senderId].find(
        m => m.receiverId === receiverId && m.id === messageId
      );
      
      if (message) {
        message.seen = true;
        if (user) {
          io.to(user.socketId).emit("messageSeen", {
            senderId,
            receiverId,
            messageId
          });
        }
      }
    }
  });

  // Last message update
  socket.on("updateLastMessage", ({ lastMessage, lastMessagesId }) => {
    io.emit("getLastMessage", {
      lastMessage,
      lastMessagesId
    });
  });

  // Cleanup on disconnect
  socket.on("disconnect", () => {
    console.log(`Disconnected: ${socket.id}`);
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});

// Start server
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`WebSocket endpoint: wss://craftycorner-j942.onrender.com`);
});