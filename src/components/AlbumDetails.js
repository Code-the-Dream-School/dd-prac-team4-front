import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AlbumDetails = () => {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/albums');
        setAlbums(response.data.albums); // Update to access the "albums" array
      } catch (error) {
        console.error('Error fetching albums:', error);
      }
    };

    fetchAlbums();
  }, []);

  return (
    <div>
      <h1>Album Details</h1>
      <ul>
        {albums.map(album => (
          <li key={album._id}>
            <h2>{album.albumName}</h2>
            <p>Artist: {album.artistName}</p>
            <p>Price: ${album.price.toFixed(2)}</p>
            <img src={album.image} alt={album.albumName} style={{ maxWidth: '200px' }} />
            {/* Additional album details can be displayed here */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AlbumDetails;
