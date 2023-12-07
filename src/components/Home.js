import React from 'react';
import AlbumsList from './album/AlbumsList';
import PropTypes from 'prop-types';

function Home() {
  return (
    <>
      <AlbumsList />
    </>
  );
}

Home.propTypes = {
  // some propTypes...
};

export default Home;
