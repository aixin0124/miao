# 🤫 Miao Whisper

A private place where two people can whisper to each other in real-time.

## Features

- **Private Rooms**: Create secure rooms with unique IDs
- **Real-time Messaging**: Instant whisper delivery using WebSockets
- **Two-Person Limit**: Each room supports exactly 2 users for private conversations
- **Clean Interface**: Simple, intuitive design focused on privacy
- **No Registration**: No accounts needed - just create or join a room
- **Ephemeral**: Messages are stored in memory only during the session

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the server:**
   ```bash
   npm start
   ```

3. **Open your browser:**
   Navigate to `http://localhost:3000`

## How to Use

### Creating a Room
1. Click "Create New Room"
2. Share the generated Room ID with one other person
3. Wait for them to join to start whispering

### Joining a Room
1. Enter the Room ID in the input field
2. Click "Join Room"
3. Start whispering once connected

### Whispering
- Type your message in the input field
- Press Enter or click "Send"
- Messages appear instantly for both users
- Only you and the other person can see the conversation

## Technical Details

- **Backend**: Node.js with Express and Socket.io
- **Frontend**: Vanilla HTML, CSS, and JavaScript
- **Real-time**: WebSocket connections for instant messaging
- **Storage**: In-memory (no database required)
- **Rooms**: Auto-cleanup when empty

## Privacy

- No messages are stored permanently
- Rooms are automatically deleted when empty
- Each room has a unique, randomly generated ID
- No user registration or tracking