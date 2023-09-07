import React, { useState, useEffect } from 'react';
import AlbumGrid from '../AlbumGrid';
import axiosInstance from '../../apis/axiosClient';

const WishListView = () => {
  const [albums, setAlbums] = useState();
  const [wishListId, setWishListId] = useState();

  //fetch wishlist album from API
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axiosInstance.post(`/wishlist/`); //use axiosInstance to send cookie token with request
        console.log('albums ' + JSON.stringify(response.data.wishlist));
        setAlbums(response.data.wishlist.albums);
        setWishListId(response.data.wishlist.id);
      } catch (error) {
        console.error('Error fetching wishlist:', error);
      }
    };

    fetchWishlist();
  }, []);

  return <AlbumGrid albums={albums} wishListId={wishListId} />;
};

export default WishListView;
