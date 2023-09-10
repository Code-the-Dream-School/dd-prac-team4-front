import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import { Link } from 'react-router-dom';
import Logout from './Logout';
import { AuthStatus, useAuth } from '@akosasante/react-auth-context';
import MenuIcon from '@mui/icons-material/Menu';
import './Navbar.css'

const Navbar = () => {
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  console.log(anchorElUser);

  const { status } = useAuth();
  const isLoggedIn = status === AuthStatus.LoggedIn;
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Music
        </Typography>
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
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
              <Logout />
            </>
          )}
        </Box>
        <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={event => setAnchorElUser(event.currentTarget)}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            sx={{ mt: '25px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <MenuItem onClick={handleCloseUserMenu}>
              <Button color="inherit" component={Link} to="/home">
                Home
              </Button>
            </MenuItem>
            {!isLoggedIn && (
              <>
                <MenuItem onClick={handleCloseUserMenu}>
                  <Button color="inherit" component={Link} to="/signIn">
                    Login
                  </Button>
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                  <Button color="inherit" component={Link} to="/register">
                    Signup
                  </Button>
                </MenuItem>
              </>
            )}
            {isLoggedIn && (
              <>
                <MenuItem onClick={handleCloseUserMenu}>
                  <Button color="inherit" component={Link} to="/profile">
                    Profile
                  </Button>
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                  <Logout />
                </MenuItem>
              </>
            )}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
