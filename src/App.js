import React, { useState, useEffect } from 'react';
import { getAllData } from './util/index';
import UserRegistration from './components/UserRegistration';
import Home from './components/Home';
import Logout from './components/Logout';
import SignIn from './components/SignIn';
import { Routes, Route } from 'react-router-dom';
import { RequireAuth } from '@akosasante/react-auth-context';

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
        <Route path="/register" element={<UserRegistration />} />
        <Route path="/signIn" element={<SignIn />} />
        {/* only logged in user can visit home page */}
        <Route
          path="/home"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </>
  );
}

export default App;
