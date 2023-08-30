import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import axios from 'axios';
///--???--///
// import { AuthStatus, useAuth } from '@akosasante/react-auth-context';
// import { useNavigate } from 'react-router-dom';
///------///

const AddToWishlistButton = ({ album }) => {
  const [isAdded, setIsAdded] = useState(false);
  const [wishlistId, setWishlistId] = useState(null);
  ///--???--///
  //   const { status } = useAuth();
  //   const navigate = useNavigate();
  //   const isUserLoggedIn = status === AuthStatus.LoggedIn;
  ///------///

  ///--???--///
  //   if (!isUserLoggedIn) {
  //     navigate('/signIn');
  //     return;
  //   }
  ///------///

  const fetchOrCreateWishlist = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8000/api/v1/wishlist',
        {
          withCredentials: true,
        }
      );
      setWishlistId(response.data.wishlist._id);

      console.log(response); //console loggin for testing purposes
    } catch (error) {
      console.error('Error creating wishlist:', error);
    }
  };

  const handleAddToWishlist = () => {
    fetchOrCreateWishlist();

    const addToWishlist = async () => {
      try {
        const response = await axios.patch(
          `http://localhost:8000/api/v1/wishlist/${wishlistId}/add_album/${album._id}`,
          {
            withCredentials: true,
          }
        );
        console.log(response); //console loggin for testing purposes
        setIsAdded(true);
      } catch (error) {
        console.error('Error adding album to wishlist:', error);
      }
    };

    if (wishlistId !== null) {
      addToWishlist();
    } else {
      alert('not working');
      return;
    }
  };

  const removeFromWishlist = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:8000/api/v1/wishlist/${wishlistId}/remove_album/${album._id}`,
        {
          withCredentials: true,
        }
      );
      console.log(response); //console loggin for testing purposes
      setIsAdded(false);
    } catch (error) {
      console.error('Error removing album from wishlist:', error);
    }
  };

  return (
    <>
      {isAdded ? (
        <Button
          variant="contained"
          color="secondary"
          className="wishlist-button"
          aria-label="Remove from Wishlist"
          onClick={removeFromWishlist}
        >
          Remove from Wishlist
        </Button>
      ) : (
        <Button
          variant="contained"
          color="secondary"
          className="wishlist-button"
          aria-label="Add to Wishlist"
          onClick={handleAddToWishlist}
        >
          Add to Wishlist
        </Button>
      )}
    </>
  );
};

export default AddToWishlistButton;
