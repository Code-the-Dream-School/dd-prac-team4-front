import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useAuth } from '@akosasante/react-auth-context';

const AlbumChat = ({ apiUrl }) => {
  const [message, setMessage] = useState('');
  const [socket, setSocket] = useState(null);
  const regexPattern = /\/albums\/([a-zA-Z0-9]+)/;
  const match = apiUrl.match(regexPattern);
  const albumId = match ? match[1] : null;

  const { user: loggedInUser } = useAuth();
  const userId = loggedInUser ? loggedInUser.user.id : null;

  // Nandle sending a chat message
  const handleSendMessage = () => {
    if (socket && albumId) {
      const messageData = {
        message,
        albumId,
        userId,
      };

      // Emit a chat message to the 'chat:album' channel
      socket.emit('chat:album', messageData);
      setMessage(''); // Clear the text input field after sending
    }
  };

  useEffect(() => {
    if (albumId && !socket) {
      const newSocket = io(process.env.REACT_APP_SOCKET_BASE_PATH);
      newSocket.on('connect', () => {
        console.log('Connected to WebSocket server');
        // Request to join the album chat room
        newSocket.emit('join:album_chat', albumId);
        newSocket.on('chat:album', (data) => {
          console.log('Received message from chat:album:', data);
        });
      });
      setSocket(newSocket);
    }
    // Disconnect from the socket when the component unmounts
    return () => {
      if (socket) {
        console.log('Disconnected from WebSocket server');
        socket.disconnect();
      }
    };
  }, [albumId, socket]);

  return (
    <div>
      <h2>Album Chat</h2>
      <div>
        <input
          type="text"
          placeholder="Enter message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default AlbumChat;
