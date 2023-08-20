import React, { useEffect, useState } from 'react';
import { getAllData } from './util/index';
import UserRegistration from './components/UserRegistration';
import SignIn from './components/SignIn';
import Home from './components/Home';
import { Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import { AuthStatus, useAuth } from '@akosasante/react-auth-context';

const URL = 'http://localhost:8000/api/v1/';

function App() {
  const [message, setMessage] = useState('');
  const { status } = useAuth();
  const isLoggedIn = status === AuthStatus.LoggedIn;

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
      <Navbar />
      <h1>{message}</h1>
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