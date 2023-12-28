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

  useEffect(() => {
    // Create a socket connection to your backend
    const socket = io(process.env.REACT_APP_SOCKET_BASE_PATH); // Replace with your actual backend URL and port
    socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });
    // Function to handle play button click
    const handlePlayClick = () => {
      const userId = user?._id;
      socket.emit('listening-to-album-play', { albumId, userId });
    };

    // Function to handle pause button click
    const handlePauseClick = () => {
      const userId = user?._id;
      socket.emit('listening-to-album-pause', { albumId, userId });
    };

    // Function to handle page unload
    const handleBeforeUnload = () => {
      socket.emit('user-leaving-page');
    };

    // Add event listeners when the component mounts
    document
      .getElementById('playButton')
      ?.addEventListener('click', handlePlayClick);
    document
      .getElementById('pauseButton')
      ?.addEventListener('click', handlePauseClick);
    window.addEventListener('beforeunload', handleBeforeUnload);

    // disconnect from the socket  when the component unmounts
    return () => {
      if (socket) {
        console.log('Disconnected from WebSocket server');
        socket.disconnect();
      }
    };
  }, [albumId, socket, user?._id]);

  // Render the component
  return (
    <>
      <h1>Listening to Album</h1>
      <button id="playButton">Play</button>
      <button id="pauseButton">Pause</button>
    </>
  );
};

// Export the ListeningAlbum component
export default ListeningAlbum;

//Akos: where should we specify the route for 'listening/:id'
//i think we should pass here from somwhere the id of the album to ListeningAlbum component
//not sure if i did it corretly in ListeningAlbum.js
//how can we connect this frontend stuff with our backend code where we handle sockets events? in src/live/index.js?
