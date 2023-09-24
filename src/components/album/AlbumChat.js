import React, { useEffect } from 'react';
import io from 'socket.io-client';

const AlbumChat = ({ apiUrl }) => {
  useEffect(() => {
    const socket = io('http://localhost:8000');

    // Subscribe to the album chat channel using albumId
    const regexPattern = /\/albums\/([a-zA-Z0-9]+)/;
    const match = apiUrl.match(regexPattern);
    if (match) {
      // Extract albumId from the URL
      const albumId = match[1];
      // Сonnection is established with the Socket.io server
      socket.on('connect', () => {
        // Request to the server to join the album chat
        socket.emit('join:album_chat', albumId);
      });
    }

    // Disconnect from the socket when the component unmounts
    return () => {
      // Disconnect from the server
      socket.disconnect();
    };
  }, [apiUrl]);

  return (
    <div>
      <h2>Album Chat</h2>
    </div>
  );
};

export default AlbumChat;