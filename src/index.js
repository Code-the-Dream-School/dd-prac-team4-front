import ReactDOM from 'react-dom'; // Keep this line
import React from 'react';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

import { makeServer } from './util/mirageServer'; 
import { AuthProvider } from '@akosasante/react-auth-context';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';

if (process.env.NODE_ENV === 'development') {
  makeServer({ environment: 'development' });
}

const envPath = process.env.REACT_APP_API_BASE_PATH;

const authSettings = {
  getCurrentUserPath: `${envPath}/users/showMe`,
  loginPath: `${envPath}/v1/auth/login`,
  logoutRedirectPath: '/',
  defaultAxiosOptions: {
    withCredentials: true,
  },
};

const defaultTheme = createTheme({
  palette: { primary: { main: '#3f51b5' }, mode: 'light' }, // Change "main" to set the primary color
});

ReactDOM.render( // Use ReactDOM.render for rendering the app
  <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
    <BrowserRouter>
      <AuthProvider {...authSettings}>
        <Provider store={store}>
          <App />
        </Provider>
      </AuthProvider>
    </BrowserRouter>
  </ThemeProvider>,
  document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
