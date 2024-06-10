import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Table,
  TableRow,
  TableCell,
  Button,
} from '@mui/material';

import ProfileImage from './ProfileImage';
import { Link } from 'react-router-dom';
import { useAuth } from '@akosasante/react-auth-context';
import axiosInstance from '../../apis/axiosClient';

export default function PersonalProfile() {
  const { user } = useAuth();
  const userData = user.user; //the user that's returned is nested in its original response shape so to use the actual user you'll need to unwrap it
  const [purchasedAlbums, setPurchasedAlbums] = useState([]);

  useEffect(() => {
    const fetchPurchasedAlbums = async () => {
      const response = await axiosInstance.get('/users/showMe/withAlbums');
      console.log(response.data.user.purchasedAlbums);
      setPurchasedAlbums(response.data.user.purchasedAlbums);
    };
    fetchPurchasedAlbums();
  }, [setPurchasedAlbums]);

  return (
    <Card className="mt-2 border-0 rounded-0 shadow-sm">
      <CardContent>
        <h3 className="text-uppercase">My Profile</h3>
        <div className="text-center">
          <ProfileImage user={user} />
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
        <div className="mt-5">
          <h4>Purchased Albums</h4>
          {purchasedAlbums.length > 0 ? (
            purchasedAlbums.map((album) => (
              <div key={album._id}>
                <p>{album.albumName}</p>
                <Link to={`/chat/${album._id}`}>
                  <Button variant="outlined" color="primary">
                    Chat with Fans
                  </Button>
                </Link>
              </div>
            ))
          ) : (
            <p>No album information available</p>
          )}
          {purchasedAlbums.length === 0 && <p>No purchased albums found.</p>}
        </div>
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
    </Card>
  );
}
