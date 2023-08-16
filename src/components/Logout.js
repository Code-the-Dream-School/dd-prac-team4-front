<<<<<<< HEAD
import { useLogout } from '@akosasante/react-auth-context';
import { useNavigate } from 'react-router-dom';
import { Button, Container } from '@mui/material';

const Logout = () => {
  // for navigate to other component
  const navigate = useNavigate();

  const errorHandler = (error) => console.error('Error during logout: ', error);

  const { submit: signOut, loading } = useLogout({
    errorHandler,
    apiUrl: 'http://localhost:8000/api/v1/auth/logout',
  });

  //handling user logout
  const handleLogout = async () => {
    const originalResponse = await signOut();
    if (originalResponse.status === 201) {
      navigate('/');
    } else {
      console.error('unexpected success response status when logging out');
      // refresh page
      navigate(0);
=======
import React from 'react';
import { useSignOut } from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';
import { Button, Container } from '@mui/material';
import axios from 'axios';

const Logout = () => {
  const signOut = useSignOut();

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
        signOut(); // Log the user out from the client-side as well
        //redirect user to home page
        navigate('/home');
      } else {
        console.log('Logout failed');
      }
    } catch (error) {
      console.error('Error during logout:', error);
>>>>>>> 73630547e9bb4f49cbbd284117a08a982f250a4d
    }
  };

  return (
<<<<<<< HEAD
    <Button onClick={handleLogout} color="inherit">
      Logout
    </Button>
=======
    <Container maxWidth="sm">
      <Button onClick={handleLogout} variant="contained" color="primary">
        Logout
      </Button>
    </Container>
>>>>>>> 73630547e9bb4f49cbbd284117a08a982f250a4d
  );
};

export default Logout;
