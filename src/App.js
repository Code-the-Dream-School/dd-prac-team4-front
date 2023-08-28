import React, { useEffect, useState } from 'react';
import { getAllData } from './util/index';
import UserRegistration from './components/UserRegistration';
import SignIn from './components/SignIn';
import Home from './components/Home';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import { AuthStatus, useAuth } from '@akosasante/react-auth-context';
import CheckoutPage from './components/Purchase/CheckoutPage';
import ShoppingCart from './components/ShoppingCartComponents';

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
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/shoppingCart" element={<ShoppingCart />} />
      </Routes>
    </>
  );
}

export default App;
