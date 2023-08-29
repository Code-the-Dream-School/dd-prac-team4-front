import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AlbumGrid from './AlbumGrid';

const WishListView = () => {
  const [wishList, setWishList] = useState([]);
  //env path for API request
  const envPath = process.env.REACT_APP_API_BASE_PATH;

  //fetch wishlist album from API
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axios.get(`${envPath}/wishlist`);
        setWishlist(response.data.albums);
      } catch (error) {
        console.error('Error fetching wishlist:', error);
      }
    };

    fetchWishlist();
  }, []);

  //remove an album from wishlist
  const removeFromWishlist = async (wishListId, albumId) => {
    try {
      const response = await axios.delete(
        `${envPath}/wishlist/wishlist/:${wishListId}/remove_album/:${albumId}`
      );
      setWishList(response.data);
    } catch (error) {
      console.error('Error while trying to remove the album', error);
    }
  };

  console.log('wishlist  ' + wishList);
  return (
    <AlbumGrid
      albums={wishList}
      isInWishlist={true}
      onRemoveFromWishlist={removeFromWishlist}
    />
  );
};

export default WishListView;
