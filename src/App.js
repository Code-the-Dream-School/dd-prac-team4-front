import React, { useState, useEffect } from 'react';
import { getAllData } from './util/index';
import UserRegistration from './components/UserRegistration';
import SignIn from './components/SignIn';
import Home from './components/Home';
import { Routes, Route, Navigate } from 'react-router-dom';
import Logout from './components/Logout';
import Navbar from './components/Navbar';
import axios from 'axios';
import { AuthStatus, useAuth } from '@akosasante/react-auth-context';

const URL = 'http://localhost:8000/api/v1/';

function App() {
  const [message, setMessage] = useState('');
  const { status } = useAuth();
  const isLoggedIn = status === AuthStatus.LoggedIn;
  // create an axios instance
  const instance = axios.create({
    withCredentials: true,
  });

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
      <Navbar />
      <h1>{message}</h1>
      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <Home /> : <Navigate to="/signIn" />}
        ></Route>
        <Route path="/register" element={<UserRegistration />}></Route>
        <Route path="/signIn" element={<SignIn />}></Route>
        <Route path="/home" element={<Home />}></Route>
      </Routes>
    </>
  );
}

export default App;
