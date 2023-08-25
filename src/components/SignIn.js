import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useLogin } from '@akosasante/react-auth-context';

export default function SignIn() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
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

  /*
   * Snackbar to display any error during login.
   */
  const [open, setOpen] = React.useState(false);
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
  /*
   * End of snackbar
   */

  /*
   * user authentication section
   */

  // error handler function
  const handleLoginError = (error) => {
    console.error(error);
  };
  const getUserFromResponse = (responseData) => {
    return responseData.user;
  };

  // initial options needed for useLogin hook
  const loginHookOptions = {
    apiUrl: `${envPath}/auth/login`,
    errorHandler: handleLoginError,
    getUserFromResponse,
    getJwtTokenFromResponse: false,
  };

  const {
    submit: signIn,
    errors,
    loading,
  } = useLogin(formData, loginHookOptions);

  /*
   * end of user authentication
   */

  //handling login form submition
  const handleSubmit = async (event) => {
    event.preventDefault();
    const originalResponse = await signIn();
    console.dir(originalResponse);
    //navigate to home page only if credential is correct
    if (originalResponse?.status === 201) {
      navigate('/home');
    }
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ mt: 5, mb: 20 }}>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChange}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {/* useLogin hook errors */}
      <Snackbar
        open={!!errors}
        autoHideDuration={6000}
        onClose={handleClose}
        message={errors?.msg}
        action={action}
      />
    </Container>
  );
}
