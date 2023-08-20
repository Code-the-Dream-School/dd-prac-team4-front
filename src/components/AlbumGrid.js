import React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Button from '@mui/material/Button';

function AlbumGrid({ albums }) {
  return (
    <Grid container spacing={2}>
      {albums.map((album) => (
        <Grid key={album._id} item xs={12} sm={6} md={4}>
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
      ))}
    </Grid>
  );
}

export default AlbumGrid;
