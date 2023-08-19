import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/v1/albums'; // Update with the correct endpoint

function App() {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    async function fetchAlbums() {
      try {
        const response = await axios.get(API_URL);
        setAlbums(response.data.albums.slice(0, 10)); // Access the "albums" array directly
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchAlbums();
  }, []);

  return (
    <div>
      <h1>Top 10 Albums</h1>
      <ul>
        {albums.map((album) => (
          <li key={album._id}>
            <img src={album.image} alt={album.albumName} />
            <p>{album.albumName} by {album.artistName}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
