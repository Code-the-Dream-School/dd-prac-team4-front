import { AuthStatus, useAuth } from '@akosasante/react-auth-context';
import React, { useEffect, useState } from 'react';
import axiosInstance from '../apis/axiosClient';
import AlbumsList from './AlbumsList';

function Home() {
  const { status, user } = useAuth();

  // testing axiosInstance request
  const [data, setData] = useState([]);

  useEffect(() => {
    axiosInstance
      .get('/showMe')
      .then((response) => {
        setData(response.data);
        console.log('this is axios instance' + data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  // end of testing

  return (
    <>
      <h1>THIS IS THE HOME PAGE</h1>
      <p>Current log-in status is: {status}</p>
      <p>Current logged-in user is: {JSON.stringify(user)}</p>
      <AlbumsList />
    </>
  );
}

export default Home;
