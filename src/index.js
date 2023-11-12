import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from '@akosasante/react-auth-context';

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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <AuthProvider {...authSettings}>
      <Provider store={store}>
        <App />
      </Provider>
    </AuthProvider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
