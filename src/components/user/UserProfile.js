import React, { useEffect, useState, useCallback } from 'react';
import axiosInstance from '../../apis/axiosClient';
import {
  Card,
  CardContent,
  Table,
  TableRow,
  TableCell,
  Button,
} from '@mui/material';

import { Avatar, Alert } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '@akosasante/react-auth-context';

export default function PersonalProfile() {
  const [purchasedAlbums, setPurchasedAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  const fetchPurchasedAlbums = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`/users/showMe/withAlbums`);
      console.log('this is what we get', response.data.user.purchasedAlbums);
      setPurchasedAlbums(response.data.user.purchasedAlbums);
      setLoading(false);
    } catch {
      console.error('Error fetching purchased albums:', error);
      setError('Error fetching albums for this user. Please try again later.');
      setLoading(false);
    }
  }, [user.userId]);

  useEffect(() => {
    fetchPurchasedAlbums();
  }, [fetchPurchasedAlbums]);

  // useEffect(() => {
  //   // Fetch user with purchased albums when the component mounts
  //   const fetchPurchasedAlbums = async () => {
  //     try {
  //       const response = await fetch('/api/showMe/withAlbums');
  //       const data = await response.json();
  //       setPurchasedAlbums(data.user.purchasedAlbums);
  //     } catch (error) {
  //       console.error('Error fetching purchased albums:', error);
  //     }
  //   };

  //   fetchPurchasedAlbums();
  // }, []);

  return (
    <Card className="mt-2 border-0 rounded-0 shadow-sm">
      <CardContent>
        <h3 className="text-uppercase">My Profile</h3>
        <div className="text-center">
          <Avatar
            src={
              require('../../images/customer.png')

              // ?.profileImage?.url ||
              // 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp'
            }
            alt="user profile"
            className="img-fluid rounded-circle"
            sx={{
              width: '100px',
              height: '100px',
              maxWidth: '100px',
              maxHeight: '100px',
            }}
          />
        </div>
        <Table className="text-center mt-5">
          <tbody>
            <TableRow>
              <TableCell>USERNAME</TableCell>
              <TableCell>{user?.username || 'N/A'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>NAME</TableCell>
              <TableCell>{user?.name || 'N/A'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>EMAIL</TableCell>
              <TableCell>{user?.email || 'N/A'}</TableCell>
            </TableRow>
            {/* <TableRow>
              <TableCell>Password</TableCell>
              <TableCell>{user?.password}</TableCell>
            </TableRow> */}
          </tbody>
        </Table>
      </CardContent>
      <Link to="/updateUserInfo">
        {' '}
        {/* Specify the path where you want to redirect */}
        <Button color="warning" style={{ backgroundColor: 'lightgrey' }}>
          Update Profile
        </Button>
      </Link>
      {/* {user?.id === user?.id && (

        <CardActions className='justify-content-center'>
          <Button onClick={handleUpdateProfileClick} color='warning' startIcon={<EditIcon />}>
            Update Profile
          </Button>
        </CardActions>
      )} */}
      <Link to="/profile/recommendations">
        <Button color="primary" style={{ margin: '10px' }}>
          View Recommendations
        </Button>
      </Link>

      <h3 className="text-uppercase">Purchased Albums</h3>
      {error && <Alert severity="error">{error}</Alert>}

      {loading && <p>Loading purchased albums...</p>}
      <Table className="text-center mt-5">
        <tbody>
          <TableRow>
            <TableCell>
              {' '}
              <b>
                {' '}
                <em></em>
              </b>
            </TableCell>
            <TableCell>
              <b>
                {' '}
                <em>Artist Name</em>
              </b>
            </TableCell>
            <TableCell>
              <b>
                {' '}
                <em>Album Name</em>
              </b>
            </TableCell>
            {/* Add more cells for other field names */}
          </TableRow>
          {purchasedAlbums.map((purchasedAlbum) => (
            <TableRow key={purchasedAlbum._id} style={{ padding: '0' }}>
              <div>
                <TableCell>
                  <img
                    src={purchasedAlbum.album.image}
                    alt="albumImage"
                    height="100px"
                    width="100px"
                  />
                </TableCell>
              </div>
              <TableCell>{purchasedAlbum.album.artistName}</TableCell>
              <TableCell>"{purchasedAlbum.album.albumName || 'N/A'}"</TableCell>
              {/* Add more cells for other album details */}
            </TableRow>
          ))}
        </tbody>
      </Table>
    </Card>
  );
}
