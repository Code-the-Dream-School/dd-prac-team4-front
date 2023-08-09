import React, { useState, useEffect } from 'react';
import { getAllData } from './util/index';
import { createServer } from 'miragejs';
import UserRegistration from './components/UserRegistration';
import Contact from './components/Contact';
import { Routes, Route } from 'react-router-dom';

createServer({
  routes() {
    this.get('http://localhost:8000/api/v1', { data: 'This is a music app' }),
      this.passthrough('http://localhost:8000/*'); // everything else will try to actually call the backend
  },
});

const URL = 'http://localhost:8000/api/v1/';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    (async () => {
      const myData = await getAllData(URL);
      setMessage(myData.data);
    })();

    return () => {
      console.log('unmounting');
    };
  }, []);

  return (
    <>
      <h1>{message}</h1>
      <Routes>
        <Route path="/register" element={<UserRegistration />}></Route>
        <Route path="/" element={<Contact />}></Route>
      </Routes>
    </>
  );
}

export default App;
