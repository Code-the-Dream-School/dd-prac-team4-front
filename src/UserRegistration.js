import * as React from 'react';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function UserRegistration() {
  const defaultTheme = createTheme();
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
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
      </Container>
    </ThemeProvider>
  );
}
export default UserRegistration;
