import React from 'react';
import Grid from '@mui/material/Grid';
import Album from './Album';

import './AlbumGrid.css';
function AlbumGrid({ albums, wishListId }) {
  return (
    <Grid container spacing={2} sx={{ marginTop: '20px' }}>

      {albums.map((album) => (
        <Grid item key={album._id} xs={12} sm={6} md={4} lg={3}>
          <Album album={album} wishListId={wishListId} />
        </Grid>
      ))}
    </Grid>
  );
}

export default AlbumGrid;
