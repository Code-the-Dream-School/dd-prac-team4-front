// Import necessary modules from React
import React, { useEffect } from 'react';
import io from 'socket.io-client';
import { useAuth } from '@akosasante/react-auth-context';

// Define the ListeningAlbum component
const ListeningAlbum = ({ albumId }) => {
  const { user } = useAuth();

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

    // Cleanup event listeners when the component unmounts
    return () => {
      document
        .getElementById('playButton')
        ?.removeEventListener('click', handlePlayClick);
      document
        .getElementById('pauseButton')
        ?.removeEventListener('click', handlePauseClick);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [albumId, user?._id]);

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
