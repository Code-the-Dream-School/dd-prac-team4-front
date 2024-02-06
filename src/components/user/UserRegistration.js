import React, { useState } from 'react';
import { useRegister } from '@akosasante/react-auth-context';
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {
  TextField,
  Button,
  Container,
  Typography,
} from '@mui/material';

const UserRegistration = () => {
  // state hook for registration input fields
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    hashedNumber: '',
    expiry: '',
    preferredPaymentOption: '',
  });

  //update the input states when their value is changed
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  //create and instance to navigate user
  const navigate = useNavigate();
  //env path for API request
  const envPath = process.env.REACT_APP_API_BASE_PATH;

  // snackbar
  const [open, setOpen] = React.useState(true);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
  // end of snackbar

  const [signupError, setSignupError] = React.useState(false);
  let errorMessage = '';

  // error handler function
  const handleSignupError = (error) => {
    setSignupError(true);
    errorMessage = error;
    console.error(error);
  };

  // Used by the useRegister hook to get the user object from the register API response
  // Hook will store the user in localStorage and in internal state
  // Since in index.js we are transforming the response to return response.user, here we should
  // make sure that the hook grabs just the response data as-is to extract the user from the response.
  const getUserFromResponse = (responseData) => responseData;
  // initial options needed for useRegister hook
  const registerHookOptions = {
    apiUrl: `${envPath}/auth/register`,
    errorHandler: handleSignupError,
    getUserFromResponse,
    getJwtTokenFromResponse: false, // our JWT is stored directly in the HTTP-only cookie, not in the response
  };

  const {
    submit: signIn,
    errors,
    loading,
  } = useRegister(formData, registerHookOptions);
  /* end signUp hook for auth */

  //handle registration form submission by calling the signUp hook
  const handleSubmit = async (e) => {
    e.preventDefault();
    const originalResponse = await signIn();
    console.dir(originalResponse);
    navigate('/home');
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5, mb: 20 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Hello {formData.name} 
      </Typography>
      {/* display snackbar if any error happened during user registration */}
      {signupError && (
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          message={errorMessage}
          action={action}
        />
      )}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
          required
        ></TextField>
        <TextField
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
          required
        />
        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
          required
        />
        <TextField
          label="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          type="password"
          fullWidth
          margin="normal"
          variant="outlined"
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
          fullWidth
        >
          Register
        </Button>
      </form>
      {/* register hook errors */}
      {errors && (
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          message={errors}
          action={action}
        />
      )}
    </Container>
  );
};

export default UserRegistration;
