// Initialize socket connection
const socket = io();

// DOM elements
const roomSelection = document.getElementById('room-selection');
const chatInterface = document.getElementById('chat-interface');
const createRoomBtn = document.getElementById('create-room-btn');
const joinRoomBtn = document.getElementById('join-room-btn');
const roomIdInput = document.getElementById('room-id-input');
const roomStatus = document.getElementById('room-status');
const roomInfo = document.getElementById('room-info');
const connectionStatus = document.getElementById('connection-status');
const messages = document.getElementById('messages');
const messageInput = document.getElementById('message-input');
const sendBtn = document.getElementById('send-btn');
const leaveRoomBtn = document.getElementById('leave-room-btn');

// State
let currentRoom = null;
let isConnected = false;

// Utility functions
function showStatus(message, type = 'info') {
    roomStatus.textContent = message;
    roomStatus.className = `status-${type}`;
    roomStatus.style.display = 'block';
}

function hideStatus() {
    roomStatus.style.display = 'none';
}

function updateConnectionStatus(status, text) {
    connectionStatus.textContent = text;
    connectionStatus.className = `status-${status}`;
}

function switchToChat() {
    roomSelection.classList.add('hidden');
    chatInterface.classList.remove('hidden');
}

function switchToRoomSelection() {
    chatInterface.classList.add('hidden');
    roomSelection.classList.remove('hidden');
    currentRoom = null;
    clearMessages();
    hideStatus();
}

function clearMessages() {
    messages.innerHTML = '';
}

function addMessage(message, type = 'received') {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message message-${type}`;
    
    const textDiv = document.createElement('div');
    textDiv.textContent = message.text || message;
    messageDiv.appendChild(textDiv);
    
    if (message.timestamp) {
        const timestampDiv = document.createElement('div');
        timestampDiv.className = 'message-timestamp';
        timestampDiv.textContent = new Date(message.timestamp).toLocaleTimeString();
        messageDiv.appendChild(timestampDiv);
    }
    
    messages.appendChild(messageDiv);
    messages.scrollTop = messages.scrollHeight;
}

function sendMessage() {
    const text = messageInput.value.trim();
    if (!text || !currentRoom) return;
    
    socket.emit('whisper', { text });
    messageInput.value = '';
}

// Socket event handlers
socket.on('connect', () => {
    console.log('Connected to server');
    isConnected = true;
});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
    isConnected = false;
    updateConnectionStatus('error', 'Disconnected');
});

socket.on('room-ready', (data) => {
    if (data.userCount === 1) {
        updateConnectionStatus('waiting', 'Waiting for someone to join...');
        addMessage('You created a private whisper room. Share the room ID with someone to start whispering.', 'system');
    } else if (data.userCount === 2) {
        updateConnectionStatus('connected', 'Connected - Ready to whisper');
        addMessage('Someone joined! You can now whisper privately.', 'system');
    }
    
    // Load previous messages
    data.messages.forEach(msg => {
        const type = msg.sender === socket.id ? 'sent' : 'received';
        addMessage(msg, type);
    });
});

socket.on('whisper-received', (message) => {
    const type = message.sender === socket.id ? 'sent' : 'received';
    addMessage(message, type);
});

socket.on('user-left', () => {
    updateConnectionStatus('waiting', 'The other person left');
    addMessage('The other person left the whisper room.', 'system');
});

// Event listeners
createRoomBtn.addEventListener('click', () => {
    createRoomBtn.disabled = true;
    showStatus('Creating room...', 'info');
    
    socket.emit('create-room', (response) => {
        createRoomBtn.disabled = false;
        
        if (response.success) {
            currentRoom = response.roomId;
            roomInfo.textContent = `Room ID: ${currentRoom}`;
            showStatus(`Room created! ID: ${currentRoom}`, 'success');
            switchToChat();
        } else {
            showStatus('Failed to create room. Please try again.', 'error');
        }
    });
});

joinRoomBtn.addEventListener('click', () => {
    const roomId = roomIdInput.value.trim();
    if (!roomId) {
        showStatus('Please enter a room ID', 'error');
        return;
    }
    
    joinRoomBtn.disabled = true;
    showStatus('Joining room...', 'info');
    
    socket.emit('join-room', roomId, (response) => {
        joinRoomBtn.disabled = false;
        
        if (response.success) {
            currentRoom = roomId;
            roomInfo.textContent = `Room ID: ${roomId}`;
            showStatus('Successfully joined room!', 'success');
            switchToChat();
        } else {
            showStatus(response.error || 'Failed to join room', 'error');
        }
    });
});

sendBtn.addEventListener('click', sendMessage);

messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

leaveRoomBtn.addEventListener('click', () => {
    if (currentRoom) {
        socket.disconnect();
        socket.connect();
        switchToRoomSelection();
    }
});

roomIdInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        joinRoomBtn.click();
    }
});

// Initialize UI
hideStatus();
updateConnectionStatus('info', 'Connecting...');

// Auto-focus on message input when chat is active
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.target === chatInterface && !chatInterface.classList.contains('hidden')) {
            messageInput.focus();
        }
    });
});

observer.observe(chatInterface, { attributes: true, attributeFilter: ['class'] });