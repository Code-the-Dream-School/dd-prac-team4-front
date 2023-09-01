import React, { useState } from 'react';
import UserRegistration from './components/UserRegistration';
import SignIn from './components/SignIn';
import Home from './components/Home';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import { AuthStatus, useAuth } from '@akosasante/react-auth-context';
import CheckoutPage from './components/Purchase/CheckoutPage';
import AlbumPreview from './components/AlbumPreview';

function App() {
  const { status } = useAuth();
  const isLoggedIn = status === AuthStatus.LoggedIn;
  const url = 'https://api.spotify.com/v1/albums/6r1lh7fHMB499vGKtIyJLy';
  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <Home /> : <Navigate to="/signIn" />}
        />
        <Route path="/register" element={<UserRegistration />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/home" element={<Home />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/preview" element={<AlbumPreview apiUrl={url} />} />
      </Routes>
    </>
  );
}

export default App;
