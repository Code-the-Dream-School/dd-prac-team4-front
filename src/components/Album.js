import React from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

function Album({ album }) {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <div className="album-item">
        <img src={album.image} alt={album.albumName} className="album-image" />
        <p className="album-title">{album.albumName}</p>
        <p className="album-artist">{album.artistName}</p>
        <div className="button-container">
          <Button variant="contained" color="primary" className="buy-button">
            Buy
          </Button>
          <Button variant="contained" color="secondary" className="wishlist-button">
            Wishlist
          </Button>
        </div>
      </div>
    </Grid>
  );
}

export default Album;
