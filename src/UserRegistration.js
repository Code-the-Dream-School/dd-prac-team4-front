import * as React from 'react';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CreditCardInput from './components/CreditCardInput';

function UserRegistration() {
  const defaultTheme = createTheme();
  const handle = (e) => {
    e.preventDefault();
    console.log('The form was submitted');
    console.dir(e);
    const form = e.target;
    const email = form['email'].value;
    const cardNumber = form['cardNumber'].value;
    const expiryDate = form['expiryDate'].value;
    const cvc = form['cvc'].value;
    console.log(
      `Got form fields: ${email}, ${cardNumber}, ${expiryDate}, ${cvc}`
    );
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <form onSubmit={handle}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <CreditCardInput />
          <button type="submit">Submit</button>
        </form>
      </Container>
    </ThemeProvider>
  );
}
export default UserRegistration;
