import { AuthStatus, useAuth } from '@akosasante/react-auth-context';
import React, { useEffect, useState } from 'react';
import axiosInstance from '../apis/axiosClient';

function Home() {
  const { status, user } = useAuth();

  // testing axiosInstance request
  const [data, setData] = useState([]);

  useEffect(() => {
    axiosInstance
      .get('/users/showMe')
      .then((response) => {
        setData(response.data); // Set the state with the response data
        console.log('HTTP response data:', response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  // end of testing

  return (
    <div>
      <h1>THIS IS THE HOME PAGE</h1>
      <p>Current log-in status is: {status}</p>
      <p>Current logged-in user is: {JSON.stringify(user)}</p>
    </div>
  );
}

export default Home;
