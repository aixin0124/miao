const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Store active whisper rooms (in-memory for simplicity)
const whisperRooms = new Map();

// Generate unique room ID
function generateRoomId() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Create a new whisper room
  socket.on('create-room', (callback) => {
    const roomId = generateRoomId();
    whisperRooms.set(roomId, {
      users: [socket.id],
      messages: [],
      createdAt: new Date()
    });
    
    socket.join(roomId);
    socket.whisperRoom = roomId;
    
    callback({ roomId, success: true });
    console.log(`Room created: ${roomId} by ${socket.id}`);
  });

  // Join an existing whisper room
  socket.on('join-room', (roomId, callback) => {
    const room = whisperRooms.get(roomId);
    
    if (!room) {
      callback({ success: false, error: 'Room not found' });
      return;
    }
    
    if (room.users.length >= 2) {
      callback({ success: false, error: 'Room is full (max 2 users)' });
      return;
    }
    
    room.users.push(socket.id);
    socket.join(roomId);
    socket.whisperRoom = roomId;
    
    // Notify both users that the room is ready
    io.to(roomId).emit('room-ready', { 
      userCount: room.users.length,
      messages: room.messages 
    });
    
    callback({ success: true, userCount: room.users.length });
    console.log(`User ${socket.id} joined room: ${roomId}`);
  });

  // Send whisper message
  socket.on('whisper', (message) => {
    if (!socket.whisperRoom) {
      return;
    }
    
    const room = whisperRooms.get(socket.whisperRoom);
    if (!room) {
      return;
    }
    
    const whisperMessage = {
      id: Date.now(),
      text: message.text,
      sender: socket.id,
      timestamp: new Date().toISOString()
    };
    
    room.messages.push(whisperMessage);
    
    // Send to all users in the whisper room
    io.to(socket.whisperRoom).emit('whisper-received', whisperMessage);
    console.log(`Whisper in room ${socket.whisperRoom}: ${message.text}`);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    
    if (socket.whisperRoom) {
      const room = whisperRooms.get(socket.whisperRoom);
      if (room) {
        room.users = room.users.filter(userId => userId !== socket.id);
        
        // Notify remaining user
        socket.to(socket.whisperRoom).emit('user-left');
        
        // Clean up empty rooms
        if (room.users.length === 0) {
          whisperRooms.delete(socket.whisperRoom);
          console.log(`Room deleted: ${socket.whisperRoom}`);
        }
      }
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Whisper server running on http://localhost:${PORT}`);
});