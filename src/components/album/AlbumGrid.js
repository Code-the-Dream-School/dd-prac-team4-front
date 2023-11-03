import React from 'react';
import Grid from '@mui/material/Grid';
import Album from './Album';
import PropTypes from 'prop-types';
import { albumShape } from '../../propTypes/albumTypes';

function AlbumGrid({ albums, wishListId }) {
  return (
    <Grid container spacing={2}>
      {albums.map((album) => (
        <Grid item key={album._id} xs={12} sm={6} md={4} lg={3}>
          <Album album={album} wishListId={wishListId} />
        </Grid>
      ))}
    </Grid>
  );
}

AlbumGrid.propTypes = {
  albums: PropTypes.arrayOf(albumShape).isRequired,
  wishListId: PropTypes.string,
};

export default AlbumGrid;
