// import React, { useState, useEffect } from 'react';
// import { getAllData } from './util/index';
// import { createServer } from 'miragejs';
// // import SignIn from './components/SignIn';

// createServer({
//   routes() {
//     // FIX bug with how mirage + axiox interact
//     // https://github.com/miragejs/miragejs/issues/814 -->
//     const NativeXMLHttpRequest = window.XMLHttpRequest;

//     window.XMLHttpRequest = function XMLHttpRequest() {
//       const request = new NativeXMLHttpRequest(arguments);
//       delete request.onloadend;
//       return request;
//     };
//     // <-- FIX

//     this.get('http://localhost:8000/api/v1', { data: 'This is a music app' }),
//       this.passthrough('http://localhost:8000/*'); // everything else will try to actually call the backend
//   },
// });

// const URL = 'http://localhost:8000/api/v1/';

// function App() {
//   const [message, setMessage] = useState('');

//   useEffect(() => {
//     (async () => {
//       const myData = await getAllData(URL);
//       setMessage(myData.data);
//     })();

//     return () => {
//       console.log('unmounting');
//     };
//   }, []);

//   return (
//     <>
//       <h1>{message}</h1>
//       <h1>learn react</h1>
//       {/* <SignIn /> */}
//     </>
//   );
// }

// export default App;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchList from './components/SearchList' // Import the SearchList component
import './App.css';

const API_URL = 'http://localhost:8000/api/v1/albums';

function App() {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    async function fetchAlbums() {
      try {
        const response = await axios.get(API_URL);
        setAlbums(response.data.albums.slice(0, 10));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchAlbums();
  }, []);

  return (
    <div className="album-grid">
      <h1>Top 10 Albums</h1>
      <SearchList albums={albums} /> {/* Use the SearchList component */}
    </div>
  );
}

export default App;

