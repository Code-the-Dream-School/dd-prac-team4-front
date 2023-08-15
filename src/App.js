import React, { useState, useEffect } from 'react';
import { getAllData } from './util/index';
import UserRegistration from './components/UserRegistration';
import Contact from './components/Contact';
import Home from './components/Home';
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
        <Route path="/register" element={<UserRegistration />}></Route>
        <Route path="/signIn" element={<Contact />}></Route>
        {/* only logged in user can visit home page */}
        <Route
          path="/home"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        ></Route>
      </Routes>
    </>
  );
}

export default App;
