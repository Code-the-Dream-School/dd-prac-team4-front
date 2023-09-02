import React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import WishList from './WishList';

function WishListGrid({ wishList, onRemoveFromWishlist }) {
  return (
    <Grid container spacing={2}>
      {wishList.map((album) => (
        <WishList
          key={album._id}
          album={album}
          isInWishlist={isInWishlist}
          onRemoveFromWishlist={onRemoveFromWishlist}
        />
      ))}
    </Grid>
  );
}

export default WishListGrid;
