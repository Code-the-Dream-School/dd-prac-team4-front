import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Logout from './userAuth/Logout';
import { AuthStatus, useAuth } from '@akosasante/react-auth-context';
import Logo from '../images/Logo.png';

const Navbar = () => {
  const { status } = useAuth();
  const isLoggedIn = status === AuthStatus.LoggedIn;
  return (
    <AppBar position="static" style={{ marginBottom: '2rem' }}>
      <Toolbar>
        <img
          src={Logo}
          alt="Logo"
          style={{ height: '2.5rem', marginRight: '0.625rem' }}
        />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          BeatBazaar
        </Typography>
        {/*when user is loggedin can not see login and signup buttons  */}
        {!isLoggedIn && (
          <>
            <Button color="inherit" component={Link} to="/signIn">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/register">
              Signup
            </Button>
          </>
        )}
        <Button color="inherit" component={Link} to="/home">
          Home
        </Button>
        {/*only if user is logged in can see the logout button  */}
        {isLoggedIn && (
          <>
            <Button color="inherit" component={Link} to="/profile">
              Profile
            </Button>

            <Button color="inherit" component={Link} to="/wishlist">
              Wishlist
            </Button>

            <Button color="inherit" component={Link} to="/forum">
              Forum
            </Button>
            <Logout />
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
