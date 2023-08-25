import React, { useState } from 'react';
import { usePaymentInputs } from 'react-payment-inputs'; //for handling payment inputs
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
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Box,
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

  const navigate = useNavigate();

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
  const getUserFromResponse = (responseData) => {
    return responseData.user;
  };
  // initial options needed for useRegister hook
  const registerHookOptions = {
    apiUrl: 'http://localhost:8000/api/v1/auth/register',
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

  //card info input fields
  const { meta, getCardNumberProps, getExpiryDateProps, getCVCProps } =
    usePaymentInputs();

  //payment type selection
  const [selectedOption, setSelectedOption] = useState('paypal'); // Initialize with the default payment option
  const paymentOptions = [
    {
      value: 'paypal',
      label: 'PayPal',
    },
    {
      value: 'card',
      label: 'Credit/Debit Card',
    },
    {
      value: 'googlepay',
      label: 'Google Pay',
    },
  ];

  return (
    <Container maxWidth="sm" sx={{ mt: 5, mb: 20 }}>
      <Typography variant="h4" align="center" gutterBottom>
        User Registration
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
        <TextField
          label="Card Number"
          name="hashedNumber"
          variant="outlined"
          fullWidth
          margin="normal"
          inputProps={getCardNumberProps({})}
        />
        <TextField
          label="Expiration Date"
          name="expiry"
          variant="outlined"
          margin="normal"
          inputProps={getExpiryDateProps({})}
        />
        <TextField
          label="CVV"
          variant="outlined"
          margin="normal"
          inputProps={getCVCProps({})}
        />
        <FormControl>
          <RadioGroup
            aria-label="demo-row-radio-buttons-group-label"
            name="preferredPaymentOption"
            onChange={handleChange}
          >
            {paymentOptions.map((option) => (
              <FormControlLabel
                key={option.value}
                value={option.value}
                control={<Radio />}
                label={
                  <Box display="flex" alignItems="center">
                    <Typography variant="body1">{option.label}</Typography>
                  </Box>
                }
              />
            ))}
          </RadioGroup>
        </FormControl>
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
