import React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
// import Button from '@mui/material/Button';
import Album from './Album';


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
