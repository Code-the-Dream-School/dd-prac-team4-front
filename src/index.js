import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'reactstrap';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import UserProfile from './components/UserProfile'; // Import the UserProfile component
import 'bootstrap/dist/css/bootstrap.min.css'; 



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
