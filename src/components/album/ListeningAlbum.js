// Import necessary modules from React
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import { useAuth } from '@akosasante/react-auth-context';

// Define the ListeningAlbum component
const ListeningAlbum = () => {
  const [socket, setSocket] = useState(null);
  const { user } = useAuth();
  // useParams returns an object with key-value pairs of URL parameters
  const { albumId } = useParams();

  // Function to handle play button click
  const handlePlayClick = () => {
    if (socket) {
      console.log('playing');
      const userId = user?._id;
      socket.emit('listening-to-album-play', { albumId, userId });
    }
  };

  // Function to handle pause button click
  const handlePauseClick = () => {
    if (socket) {
      console.log('paused');
      const userId = user?._id;
      socket.emit('listening-to-album-pause', { albumId, userId });
    }
  };

  // Function to handle page unload
  const handleBeforeUnload = () => {
    if (socket) {
      console.log('user left page');
      socket.emit('user-left-page');
      socket.disconnect();
    }
  };

  useEffect(() => {
    if (!socket) {
      // Create a socket connection to your backend
      const newSocket = io(process.env.REACT_APP_SOCKET_BASE_PATH); // Replace with your actual backend URL and port
      newSocket.on('connect', () => {
        console.log('Connected to WebSocket server');
      });
      setSocket(newSocket);
    }

    // disconnect from the socket (clean up step  when the component unmounts)
    return () => {
      handleBeforeUnload();
    };
  }, [albumId, socket, user?._id]);

  // Render the component
  return (
    <>
      <h1>Listening to Album</h1>
      <button onClick={handlePlayClick} id="playButton">
        Play
      </button>
      <button onClick={handlePauseClick} id="pauseButton">
        Pause
      </button>
    </>
  );
};

// Export the ListeningAlbum component
export default ListeningAlbum;
