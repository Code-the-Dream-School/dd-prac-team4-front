import React, { useState } from 'react';
import { usePaymentInputs } from 'react-payment-inputs';
import axios from 'axios';
import {
  TextField,
  Button,
  Container,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Box,
} from '@mui/material';

const UserRegistration = () => {
  // state hook for registration input fields
  const [formData, setFormData] = useState({
    name: '',
    // username: '',
    email: '',
    password: '',
    role: '',
    hashedNumber: '',
    expiry: '',
    preferredPaymentOption: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  //handle registration form submition
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        ' localhost:8000/api/v1/auth/register',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.status === 200) {
        console.log(response.data.message); // Registration successful message
      } else {
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
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
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        User Registration
      </Typography>
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
        {/* <TextField
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
          required
        /> */}
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
        <FormControl>
          <FormLabel id="demo-row-radio-buttons-group-label">Role:</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="role"
            onChange={handleChange}
          >
            <FormControlLabel value="user" control={<Radio />} label="User" />
            <FormControlLabel value="admin" control={<Radio />} label="Admin" />
          </RadioGroup>
        </FormControl>
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
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Register
        </Button>
      </form>
    </Container>
  );
};

export default UserRegistration;
