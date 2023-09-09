import React from 'react';
import UserRegistration from './components/UserRegistration';
import SignIn from './components/SignIn';
import Home from './components/Home';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import { AuthStatus, useAuth } from '@akosasante/react-auth-context';
import CheckoutPage from './components/Purchase/CheckoutPage';
import UserProfile from './components/UserProfile';
import CheckoutComplete from './components/Purchase/CheckoutComplete';
import PageNotFound from './components/PageNotFound';

function App() {
  const { status } = useAuth();
  const isLoggedIn = status === AuthStatus.LoggedIn;

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
        <Route path="/checkout/completed" element={<CheckoutComplete />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
