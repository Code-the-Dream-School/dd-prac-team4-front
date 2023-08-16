import React from 'react';
// import { useSignOut } from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';
import { Button, Container } from '@mui/material';
import axios from 'axios';

const Logout = () => {
  // const signOut = useSignOut();

  const navigate = useNavigate(); // for navigation

  //handling user logout
  const handleLogout = async () => {
    try {
      // Make a request to the backend logout endpoint
      const response = await axios.post(
        'http://localhost:8000/api/v1/auth/logout'
      );
      // If the backend indicates successful logout
      if (response.status === 201) {
        // signOut(); // Log the user out from the client-side as well
        //redirect user to home page
        navigate('/home');
      } else {
        console.log('Logout failed');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Button onClick={handleLogout} variant="contained" color="primary">
        Logout
      </Button>
    </Container>
  );
};

export default Logout;
