import React, { useState, useEffect } from 'react';
import AlbumGrid from '../AlbumGrid';
import axiosInstance from '../../apis/axiosClient';

const WishListView = () => {
  const [albums, setAlbums] = useState();

  //fetch wishlist album from API
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axiosInstance.post(`/wishlist/`); //use axiosInstance to send cookie token with request
        setAlbums(response.data.wishlist.albums);
      } catch (error) {
        console.error('Error fetching wishlist:', error);
      }
    };

    fetchWishlist();
  }, []);

  return <AlbumGrid albums={albums} isInWishlist={true} />;
};

export default WishListView;
