import React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Album from './Album';
import './AlbumGrid.css';

function AlbumGrid({ albums, isInWishlist, onRemoveFromWishlist }) {
  console.log('albums', albums);
  return (
    <Grid container spacing={2}>
      {albums.map((album) => (
        <Album
          key={album._id}
          album={album}
          isInWishlist={isInWishlist}
          onRemoveFromWishlist={onRemoveFromWishlist}
        />
      ))}
    </Grid>
  );
}

export default AlbumGrid;
