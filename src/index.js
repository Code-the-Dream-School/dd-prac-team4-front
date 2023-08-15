import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
 
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import ViewUserProfile from './components/UserProfile'; // Import the ViewUserProfile component


const mockUser = {
  username: john123,
  name: 'John Doe',
  email: 'johndoe@example.com',
  bio: 'The song that I am loving this week is Munekita.',
  roles: [
    { id: 1, name: 'User' },
    { id: 2, name: 'Admin' },
  ],
  image:
    'https://cdn.dribbble.com/users/6142/screenshots/5679189/media/1b96ad1f07feee81fa83c877a1e350ce.png?compress=1&resize=400x300&vertical=top',
};

const handleUpdateProfileClick = () => {
  // Handle profile update
};


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
