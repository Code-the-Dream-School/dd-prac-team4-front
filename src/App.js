
import React, { useState, useEffect } from 'react';
import { getAllData } from './util/index';
import UserProfile from './components/UserProfile';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    (async () => {
      const myData = await getAllData(URL);
      if (myData) {
        setMessage(myData.data);
      } else {
        // Handle error
      }
    })();
  
    return () => {
      console.log('unmounting');
    };
  }, []);
  
  const mockUser = {
    username: 'john123',
    name: 'John Doe',
    email: 'johndoe@example.com',
    bio: 'The song that I am loving this week is Munekita.',
    roles: [
      { id: 1, name: 'User' },
      { id: 2, name: 'Admin' },
    ],
    image: 'https://cdn.dribbble.com/users/6142/screenshots/5679189/media/1b96ad1f07feee81fa83c877a1e350ce.png?compress=1&resize=400x300&vertical=top',
  };

  return (
    <div className='App'>
      <h1>{message}</h1>
      <UserProfile user={mockUser} />
    </div>
  );
}

export default App;
