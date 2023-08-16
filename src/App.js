import React, { useState, useEffect } from 'react';
import { getAllData } from './util/index';
import UserRegistration from './components/UserRegistration';
import Home from './components/Home';
import Logout from './components/Logout';
import { Routes, Route } from 'react-router-dom';
import SignIn from './components/SignIn';

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
        <Route path="/signIn" element={<SignIn />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/logout" element={<Logout />}></Route>
      </Routes>
    </>
  );
}

export default App;
