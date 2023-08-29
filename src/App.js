import React, { useState } from 'react';
import UserRegistration from './components/UserRegistration';
import SignIn from './components/SignIn';
import Home from './components/Home';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import { AuthStatus, useAuth } from '@akosasante/react-auth-context';
import CheckoutPage from './components/Purchase/CheckoutPage';
import AlbumDetails from './components/AlbumDetails';

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

        {/* Ticket PS-55 */}
        {/* <Route path="/albums" element={<AlbumDetails />} /> */}
        {/* <AlbumDetails/> */}
      </Routes>
    </>
  );
}

export default App;

//--- barebones code --
// use this to display record details

// import React from 'react';
// import AlbumDetails from './components/AlbumDetails';

// const App = () => {
//   return (
//     <div>
//       {/* Other components */}
//       <AlbumDetails />
//     </div>
//   );
// };

// export default App;

