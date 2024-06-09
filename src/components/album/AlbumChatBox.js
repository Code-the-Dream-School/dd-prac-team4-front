import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import { useAuth } from '@akosasante/react-auth-context';
import { Typography, TextField, Button } from '@mui/material';
import axiosInstance from '../../apis/axiosClient';

const AlbumChatBox = ({ adminId }) => {
  const [message, setMessage] = useState('');
  const [socket, setSocket] = useState(null);
  const regexPattern = /\/albums\/([a-zA-Z0-9]+)/;
  const match = adminId && adminId.match(regexPattern);
  const albumId = match ? match[1] : null;

  const { user } = useAuth();
  const loggedInUserId = user?.id;

  const [messages, setMessages] = useState([]);
  const messagesContainerRef = useRef(null);

  // Handle sending a chat message
  const handleSendMessage = () => {
    if (socket && albumId) {
      const messageData = {
        message,
        albumId,
        user: loggedInUserId,
      };

      // Emit a chat message to the 'chat:album' channel
      socket.emit('chat:album', messageData);
      setMessage(''); // Clear the text input field after sending
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
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

          const isOwnMessage = loggedInUserId === data.user._id; // Determine isOwnMessage
          const messageWithKey = {
            ...data,
            isOwnMessage,
          };
          setMessages((prevMessages) => [...prevMessages, messageWithKey]);

          scrollToBottom();
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
  }, [albumId, socket, loggedInUserId]);

  useEffect(() => {
    const fetchRecentMessages = async () => {
      if (albumId && !socket) {
        const { data } = await axiosInstance.get(`/chat/${albumId}`);
        setMessages(data.messages);
      }
    };
    fetchRecentMessages();
  }, [albumId, socket]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography variant="h6" component="div" style={{ marginLeft: '20px' }}>
        Album Chat
      </Typography>
      <div
        style={{
          flex: 1,
          padding: '16px',
          width: '95%',
          maxHeight: '65vh',
          overflowY: 'auto',
        }}
        ref={messagesContainerRef}
      >
        {messages.map((message) => (
          <div key={message._id}>
            <div
              style={{
                display: 'flex',
                flexDirection: message.isOwnMessage ? 'row-reverse' : 'row',
                alignItems: 'center',
                margin: '20px',
              }}
            >
              <div
                style={{
                  backgroundColor: message.isOwnMessage
                    ? '#3f51b5'
                    : 'lightblue',
                  color: message.isOwnMessage ? 'white' : 'black',
                  borderRadius: '8px',
                  padding: '8px 16px',
                }}
              >
                <strong>{message.user.name}</strong>: {message.message}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          padding: '30px',
          width: '70%',
          display: 'flex',
          alignItems: 'center',
          position: 'fixed',
          bottom: 0,
        }}
      >
        <div style={{ flex: 1 }}>
          <TextField
            fullWidth
            variant="outlined"
            label="Enter message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </div>
        <div style={{ marginLeft: '8px' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSendMessage}
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AlbumChatBox;
