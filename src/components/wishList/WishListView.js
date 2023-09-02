import React, { useState, useEffect } from 'react';
import AlbumGrid from '../AlbumGrid';
import axiosInstance from '../../apis/axiosClient';

const WishListView = () => {
  const [wishList, setWishList] = useState([]);
  const [albums, setAlbums] = useState();

  //fetch wishlist album from API
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axiosInstance.post(`/wishlist/`); //use axiosInstance to send cookie token with request
        setWishList(response.data.wishlist);
        const albums = response.data.wishlist.albums;
        // if (albums.length === 1) {
        //   const albumId = albums[0].id;
        //   fetchAlbumById(albumId);
        // }
      } catch (error) {
        console.error('Error fetching wishlist:', error);
      }
    };

    fetchWishlist();
  }, []);

  // const fetchAlbumById = async (albumId) => {
  //   try {
  //     const response = await axiosInstance.get(`/albums/${albumId}`);
  //     setAlbums(response.data.album);
  //   } catch (error) {
  //     console.error('Error during fetching albums', error);
  //   }
  // };

  //remove an album from wishlist
  const removeFromWishlist = async (wishListId, albumId) => {
    try {
      const response = await axiosInstance.delete(
        `/wishlist/:${wishListId}/remove_album/:${albumId}`
      );
      setWishList(response.data.wishlist);
    } catch (error) {
      console.error('Error while trying to remove the album', error);
    }
  };
  console.log('wishlist ' + wishList);

  return (
    <AlbumGrid
      albums={album}
      isInWishlist={true}
      onRemoveFromWishlist={removeFromWishlist}
    />
  );
};

export default WishListView;
