import React from 'react';
import ReactDOM from 'react-dom/client';
import { makeServer } from './util/mirageServer';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from '@akosasante/react-auth-context';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';

if (process.env.NODE_ENV === 'development') {
  makeServer({ environment: 'development' });
}

const authSettings = {
  getCurrentUserPath: 'http://localhost:8000/api/v1/auth/showMe',
  loginPath: 'http://localhost:8000/api/v1/auth/login',
  logoutRedirectPath: '/',
  defaultAxiosOptions: {
    withCredentials: true,
  },
};

// Set up a default colour pallete / theme for our whole app using material-ui ThemeProvider context component
const defaultTheme = createTheme({
  palette: { main: '#3f51b5', mode: 'light' },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={defaultTheme}>
    {/* Use CSS baseline to set common spacing/sizing across all of our styling */}
    <CssBaseline />
    <BrowserRouter>
      <AuthProvider {...authSettings}>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
