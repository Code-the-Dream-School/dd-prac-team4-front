import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom'; // You can use react-router-dom for handling links
import Logout from './Logout';
import { AuthStatus, useAuth } from '@akosasante/react-auth-context';

const Navbar = () => {
  const { status } = useAuth();
  const isLoggedIn = status === AuthStatus.LoggedIn;
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Music
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
            <Button color="inherit" component={Link} to="/wishlist">
              Wishlist
            </Button>
          </>
        )}
        <Button color="inherit" component={Link} to="/home">
          Home
        </Button>
        {/*only if user is logged in can see the logout button  */}
        {isLoggedIn && <Logout />}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

