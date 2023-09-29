import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const AlbumChat = ({ apiUrl }) => {
  const [message, setMessage] = useState('');

  // Nandle sending a chat message
  const handleSendMessage = () => {
    const socket = io(process.env.REACT_APP_SOCKET_BASE_PATH);
    const regexPattern = /\/albums\/([a-zA-Z0-9]+)/;
    const match = apiUrl.match(regexPattern);
    if (match) {
      const albumId = match[1];
      // Emit a chat message to the 'chat:album' channel
      socket.emit('chat:album', { message, albumId });
      setMessage(''); // Clear the text input field after sending
    }
  };

  useEffect(() => {
    const socket = io(process.env.REACT_APP_SOCKET_BASE_PATH);
    const regexPattern = /\/albums\/([a-zA-Z0-9]+)/;
    const match = apiUrl.match(regexPattern);
    if (match) {
      const albumId = match[1];
      socket.on('connect', () => {
        console.log('Connected to WebSocket server');
        // Request to join the album chat room
        socket.emit('join:album_chat', albumId);
        socket.on('chat:album', (data) => {
          console.log('Received message from chat:album:', data);
        });
      });
    }

    // Disconnect from the socket when the component unmounts
    return () => {
      console.log('Disconnected from WebSocket server');
      socket.disconnect();
    };
  }, [apiUrl]);

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
