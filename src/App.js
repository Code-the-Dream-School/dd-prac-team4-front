
import React, { useEffect, useState } from 'react';
import { getAllData } from './util/index';
import UserRegistration from './components/UserRegistration';
import SignIn from './components/SignIn';
import Home from './components/Home';
import { Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import { AuthStatus, useAuth } from '@akosasante/react-auth-context';

const URL = 'http://localhost:8000/api/v1/';
import UserProfile from './components/UserProfile';

function App() {
  const [message, setMessage] = useState('');
  const { status } = useAuth();
  const isLoggedIn = status === AuthStatus.LoggedIn;
  const [message, setMessage] = useState('');

  useEffect(() => {
    (async () => {
      const myData = await getAllData(URL);
      if (myData) {
        setMessage(myData.data);
      } else {
        // Handle error
      }
    })();
  
    return () => {
      console.log('unmounting');
    };
  }, []);
  
  const mockUser = {
    username: 'john123',
    name: 'John Doe',
    email: 'johndoe@example.com',
    bio: 'The song that I am loving this week is Munekita.',
    roles: [
      { id: 1, name: 'User' },
      { id: 2, name: 'Admin' },
    ],
    image: 'https://cdn.dribbble.com/users/6142/screenshots/5679189/media/1b96ad1f07feee81fa83c877a1e350ce.png?compress=1&resize=400x300&vertical=top',
  };

  return (
    <div className='App'>
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
      <UserProfile user={mockUser} />
    </div>
  );
}

export default App;
