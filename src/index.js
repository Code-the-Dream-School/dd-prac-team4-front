import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

import { RequireAuth } from '@akosasante/react-auth-context'; 
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';

// uncomment to use mock server in development
// import { makeServer } from './util/mirageServer'; //mocking backend server
// if (process.env.NODE_ENV === 'development') {
//   makeServer({ environment: 'development' });
// }

const baseAPIPath = process.env.REACT_APP_API_BASE_PATH;

const authSettings = {
  getCurrentUserPath: `${baseAPIPath}/users/showMe`,
  loginPath: `${baseAPIPath}/v1/auth/login`,
  logoutRedirectPath: '/',
  defaultAxiosOptions: {
    withCredentials: true,
  },
};

// Set up a default colour pallette / theme for our whole app using material-ui ThemeProvider context component
const defaultTheme = createTheme({
  palette: { primary: { main: '#3f51b5' }, mode: 'light' }, // Change "main" to set the primary color
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={defaultTheme}>
    {/* Use CSS baseline to set common spacing/sizing across all of our styling */}
    <CssBaseline />
    <BrowserRouter>
      <RequireAuth {...authSettings}>
        <Provider store={store}>
          <App />
        </Provider>
      </RequireAuth>
    </BrowserRouter>
  </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
