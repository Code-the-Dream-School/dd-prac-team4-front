import React, { useEffect, useState } from 'react';
import { getAllData } from './util/index';
import UserRegistration from './components/UserRegistration';
import SignIn from './components/SignIn';
import Home from './components/Home';
import { Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import { AuthStatus, useAuth } from '@akosasante/react-auth-context';
import usersApi from './apis/usersApi';
import Loader from './components/layout/Loader/Loader';

const URL = 'http://localhost:8000/api/v1/';

function App() {
  const [message, setMessage] = useState('');
  const { status } = useAuth();
  const isLoggedIn = status === AuthStatus.LoggedIn;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // define an async function and call it immediately (by adding the parentheses at the end)
    // same as doing : const fetchData = async () => { ... }; fetchData();
    (async () => {
      try {
        setLoading(true);
        const user = await usersApi.getById('64e75e0c010653c8fae9a391');
        setLoading(false);
        setMessage(`HELLO: ${user.name}`);
      } catch (error) {
        setMessage('error loading data: ' + error.message);
      }
    })();

    // empty array in the second argument means that this effect will only run once (like componentDidMount in class components)
  }, []);

  return (
    <>
      <Navbar />
      {loading ? <Loader className="small-spinner" /> : <h1>{message}</h1>}
      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <Home /> : <Navigate to="/signIn" />}
        />
        <Route path="/register" element={<UserRegistration />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
