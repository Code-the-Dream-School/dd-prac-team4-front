import React, { useState } from 'react';
import { usePaymentInputs } from 'react-payment-inputs';
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
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    user_role: '',
    payment_type: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
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
        <FormControl>
          <FormLabel id="demo-row-radio-buttons-group-label">Role:</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="user_role"
            onChange={handleChange}
          >
            <FormControlLabel value="user" control={<Radio />} label="User" />
            <FormControlLabel value="admin" control={<Radio />} label="Admin" />
          </RadioGroup>
        </FormControl>
        <TextField
          label="Card Number"
          variant="outlined"
          fullWidth
          margin="normal"
          inputProps={getCardNumberProps({})}
          required
        />
        <TextField
          label="Expiration Date"
          variant="outlined"
          margin="normal"
          inputProps={getExpiryDateProps({})}
          required
        />
        <TextField
          label="CVV"
          variant="outlined"
          margin="normal"
          inputProps={getCVCProps({})}
          required
        />
        <FormControl>
          <RadioGroup
            aria-label="demo-row-radio-buttons-group-label"
            name="payment_type"
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
