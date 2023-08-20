import React, { useState, useEffect } from 'react';
import { getAllData } from './util/index';
import { createServer } from 'miragejs';
import AlbumGrid from './components/AlbumGrid';
import './App.css';
import axios from 'axios';

createServer({
  routes() {
    // FIX bug with how mirage + axiox interact
    // https://github.com/miragejs/miragejs/issues/814 -->
    const NativeXMLHttpRequest = window.XMLHttpRequest;

    window.XMLHttpRequest = function XMLHttpRequest() {
      const request = new NativeXMLHttpRequest(arguments);
      delete request.onloadend;
      return request;
    };
    // <-- FIX

    this.get('http://localhost:8000/api/v1', { data: 'This is a music app' }),
      this.passthrough('http://localhost:8000/*'); // everything else will try to actually call the backend
  },
});

const URL = 'http://localhost:8000/api/v1/';

function App() {
  const [message, setMessage] = useState('');
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    (async () => {
      const myData = await getAllData(URL);
      setMessage(myData.data);
    })();

    // Fetch albums data
    async function fetchAlbums() {
      try {
        const response = await axios.get(URL + 'albums');
        setAlbums(response.data.albums.slice(0, 10));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchAlbums();

    return () => {
      console.log('unmounting');
    };
  }, []);

  return (
    <>
      <h1>{message}</h1>
      <h1>learn react</h1>
      {/* <SignIn /> */}

      <h1>Top 10 Albums</h1>
      <AlbumGrid albums={albums} /> {/* Use the AlbumGrid component */}

    </>
  );
}

export default App;