import React, { useState } from 'react';
import UserRegistration from './components/user/UserRegistration';
import SignIn from './components/userAuth/SignIn';
import Home from './components/Home';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import { RequireAuth } from '@akosasante/react-auth-context';
import CheckoutPage from './components/Purchase/CheckoutPage';
import WishListView from './components/wishList/WishListView';
import UserProfile from './components/user/UserProfile';
import CheckoutComplete from './components/Purchase/CheckoutComplete';
import PageNotFound from './components/PageNotFound';
import AlbumChat from './components/album/AlbumChat';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import RecommendationPage from './components/RecommendationPage';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import PersonalProfileEditForm from './components/user/PersonalProfileEditForm';
import CartItems from './components/Cart';

function App() {
  const [mode, setMode] = useState('light');

  const toggleDarkMode = (value) => {
    setMode(value);
  };

  const lightTheme = createTheme({
    palette: {
      mode: 'light',
      primary: { main: '#000000' },
      background: { default: '#C0C0C2', paper: '#ECECEC' },
      wishlist: {
        main: '#E72929',
      },
      // etc any other customizations that we want to make for light mode
    },
    typography: {
      fontFamily: 'Poppins, sans-serif',
    },
  });

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: { main: '#fff' },
      background: { default: '#111', paper: '#1e1e1e' },
      wishlist: {
        main: '#E72929',
      },
    },
    typography: {
      fontFamily: 'Poppins, sans-serif',
    },
  });

  const currentTheme = mode === 'dark' ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <Navbar toggleDarkMode={toggleDarkMode} mode={mode} />
      <Routes>
        <Route path="/home?" element={<Home />} />
        <Route path="/register" element={<UserRegistration />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
        <Route path="/cart" element={<CartItems />} />

        <Route
          path="/wishlist"
          element={
            <RequireAuth>
              <WishListView />
            </RequireAuth>
          }
        />
        <Route
          path="/profile"
          element={
            <RequireAuth>
              <UserProfile />
            </RequireAuth>
          }
        />
        <Route
          path="/checkout"
          element={
            <RequireAuth>
              <CheckoutPage />
            </RequireAuth>
          }
        />
        <Route
          path="/checkout/completed"
          element={
            <RequireAuth>
              <CheckoutComplete />
            </RequireAuth>
          }
        />
        <Route
          path="/updateUserInfo"
          element={
            <RequireAuth>
              <PersonalProfileEditForm />
            </RequireAuth>
          }
        />

        <Route
          path="/checkout"
          element={
            <RequireAuth>
              <CheckoutPage />
            </RequireAuth>
          }
        />
        <Route
          path="/wishlist"
          element={
            <RequireAuth>
              <WishListView />
            </RequireAuth>
          }
        />
        <Route
          path="/checkout/completed"
          element={
            <RequireAuth>
              <CheckoutComplete />
            </RequireAuth>
          }
        />
        <Route
          path="/profile"
          element={
            <RequireAuth>
              <UserProfile />
            </RequireAuth>
          }
        />
        <Route
          path="/profile/recommendations"
          element={
            <RequireAuth>
              <RecommendationPage />
            </RequireAuth>
          }
        />
        <Route
          path="/updateUserInfo"
          element={
            <RequireAuth>
              <PersonalProfileEditForm />
            </RequireAuth>
          }
        />
        <Route
          path="/chat"
          element={
            <RequireAuth>
              <AlbumChat spotifyUrl="https://api.spotify.com/v1/albums/6r1lh7fHMB499vGKtIyJLy" />
            </RequireAuth>
          }
        />
        {/* Below route is the catch-all route. It **MUST** be the last route because react-router checks the routes from top-to-bottom */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </ThemeProvider>
  );
}

App.propTypes = {
  // some propTypes...
};

export default App;
