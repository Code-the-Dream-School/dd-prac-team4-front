import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import AddToCartButton from './layout/AddToCartButton/AddToCartButton';

function Album({ album, isInWishlist, onRemoveFromWishlist }) {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <div className="album-item">
        {/* Image as a Button */}
        <Button onClick={handleOpenDialog} className="album-image-button">
          <img
            src={album.image}
            alt={album.albumName}
            className="album-image"
          />
        </Button>
        <p className="album-title">{album.albumName}</p>
        <p className="album-artist">{album.artistName}</p>
        <div className="button-container">
          {/*AddToCartButton component */}
          <AddToCartButton album={album} />

          <Button
            variant="outlined"
            color="secondary"
            onClick={() => onRemoveFromWishlist(album.id)}
          >
            Remove from Wishlist
          </Button>
        </div>
      </div>
    </Grid>
  );
}

export default Album;
