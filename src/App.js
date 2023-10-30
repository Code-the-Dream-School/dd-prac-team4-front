import React from 'react';
import UserRegistration from './components/user/UserRegistration';
import SignIn from './components/userAuth/SignIn';
import Home from './components/Home';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import { AuthStatus, useAuth } from '@akosasante/react-auth-context';
import CheckoutPage from './components/Purchase/CheckoutPage';
import WishListView from './components/wishList/WishListView';
import UserProfile from './components/user/UserProfile';
import UpdateUserProfileFields from './components/user/UpdateUserProfileFields';
import CheckoutComplete from './components/Purchase/CheckoutComplete';
import PageNotFound from './components/PageNotFound';
import AlbumChat from './components/album/AlbumChat';

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
        <Route path="/wishlist" element={<WishListView />} />
        <Route path="/checkout/completed" element={<CheckoutComplete />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/updateUserInfo" element={<UpdateUserProfileFields />} />
        <Route
          path="/chat"
          element={
            <AlbumChat spotifyUrl="https://api.spotify.com/v1/albums/6r1lh7fHMB499vGKtIyJLy" />
          }
        />
        {/* Below route is the catch-all route. It **MUST** be the last route because react-router checks the routes from top-to-bottom */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
