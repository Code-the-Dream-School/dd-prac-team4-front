import React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Album from './Album';
import './AlbumGrid.css';

function AlbumGrid({ albums }) {
  return (
    <Grid container spacing={2}>
      {albums.map((album) => (
        <Album key={album._id} album={album} />
      ))}
    </Grid>
  );
}

export default AlbumGrid;
