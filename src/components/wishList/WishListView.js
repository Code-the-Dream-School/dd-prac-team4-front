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
        const wishlistData = response.data.wishlist;
        setWishListId(wishlistData._id); //set the state for wishlist id
        setAlbums(wishlistData.albums); //set the state for wishlist albums
        // Store each album id from wishlist in local storage
        wishlistData.albums.forEach((album) => {
          localStorage.setItem(
            `wishListAlbums-${album._id}`,
            JSON.stringify(true)
          );
        });
      } catch (error) {
        console.error('Error fetching wishlist:', error);
      }
    };

    fetchWishlist();
  }, []);

  return <AlbumGrid albums={albums} wishListId={wishListId} />;
};

export default WishListView;
