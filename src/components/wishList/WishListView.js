import React, { useState, useEffect } from 'react';
import AlbumGrid from '../AlbumGrid';
import axiosInstance from '../../apis/axiosClient';
import Container from '@mui/material/Container';
import { Typography } from '@mui/material';

//container style
const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  minHeight: '100vh',
};

const WishListView = () => {
  const [albums, setAlbums] = useState([]);
  const [wishListId, setWishListId] = useState();

  //fetch wishlist album from API
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axiosInstance.post(`/wishlist/`); //use axiosInstance to send cookie token with request
        const wishlistData = response.data.wishlist;
        setWishListId(wishlistData._id); //set the state for wishlist id
        setAlbums(wishlistData.albums); //set the state for wishlist albums

        // Store object in local storage where keys are album id and value is the whole album
        const wishlistAlbumsToStore = {};
        wishlistData.albums.forEach((album) => {
          wishlistAlbumsToStore[album._id] = album;
        });
        localStorage.setItem(
          'wishlistAlbums',
          JSON.stringify(wishlistAlbumsToStore)
        );
      } catch (error) {
        console.error('Error fetching wishlist:', error);
      }
    };
    fetchWishlist();
  }, []);

  return (
    <Container style={containerStyle}>
      <Typography
        variant="h3"
        style={{ fontWeight: 'bold', fontStyle: 'italic', margin: '1em 0' }}
      >
        Wishlist
      </Typography>
      {albums.length === 0 ? (
        <Typography variant="body1">No albums in your wishlist</Typography>
      ) : (
        <AlbumGrid albums={albums} wishListId={wishListId} />
      )}
    </Container>
  );
};

export default WishListView;
