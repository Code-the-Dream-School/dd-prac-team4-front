import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Snackbar from '@mui/material/Snackbar';
import AlbumGrid from './AlbumGrid';
import OrderSidebar from '../OrderSidebar';
import axiosInstance from '../../apis/axiosClient';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import {
  Container,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Box,
  Grid,
} from '@mui/material';

const AlbumsList = () => {
  const [albums, setAlbums] = useState([]); // for albums
  const [totalPages, setTotalPages] = useState(1); // Track total pages for this search
  const limit = 12;
  // const [limit, setLimit] = useState(12); // for pagination
  const [searchType, setSearchType] = useState('albumName'); //default value for select input
  const [searchTerm, setSearchTerm] = useState(''); // for search input filed value
  const [message, setMessage] = useState(''); // for not found message
  const [errorMessage, setErrorMessage] = useState(''); // for error message
  const [wishListId, setWishListId] = useState();
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  // const [lastSearchTerm, setLastSearchTerm] = useState('');

  //make an API call with search values to backend and return the result
  const fetchAlbums = useCallback(
    async (searchType, searchTerm) => {
      try {
        //const offset = (currentPage - 1) * limit;
        const offset = (searchTerm === '' ? currentPage - 1 : 0) * limit;

        //for testing
        // console.log(currentPage - 1 + ' * ' + limit + ' = ' + offset);
        // console.log('searchType:' + searchType + ' ; searchTerm:' + searchTerm);

        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_PATH}/albums/filter`,
          {
            params: {
              limit: limit,
              [searchType]: searchTerm,
              offset,
            },
          }
        );
        const searchResult = response.data.albums;
        setAlbums(searchResult);
        setTotalPages(response.data.totalPages);
        if (searchResult.length === 0) {
          setMessage('No result found');
        }
      } catch (error) {
        console.error('Error fetching albums:', error);
        setErrorMessage(error.message);
        setOpen(true);
      }
    },
    [currentPage, limit]
  );
  //display 12 albums when first user visit this page
  // useEffect(() => {
  //   fetchAlbums('albumName', '');
  // }, [fetchAlbums, currentPage]); // Refetch albums when the page changes

  useEffect(() => {
    fetchAlbums(searchType, searchTerm);
  }, [fetchAlbums, currentPage, searchTerm, searchType]);

  //fetch wishlist album from API
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axiosInstance.post(`/wishlist/`); //use axiosInstance to send cookie token with request
        const wishlistData = response.data.wishlist;
        setWishListId(wishlistData._id);
        // Store object in local storage where keys are album id and value is the whole album
        const wishlistAlbumsToStore = {};
        wishlistData.albums.forEach((album) => {
          wishlistAlbumsToStore[album._id] = album;
        });
        localStorage.setItem(
          'wishlistAlbums',
          JSON.stringify(wishlistAlbumsToStore)
        );
      } catch (error) {
        console.error('Error fetching wishlist:', error);
      }
    };

    fetchWishlist();
  }, []);

  //call the function to make API request for search input value
  const handleSearch = () => {
    //   fetchAlbums(searchType, searchTerm);

    if (currentPage === 1) {
      // resetting the current page to 1 won't trigger useEffect so here we have to call the fetch callback manually
      fetchAlbums(searchType, searchTerm);
    } else {
      setCurrentPage(1);
    }
  };

  //clear search input and make an empty API call
  const handleClear = () => {
    //setSearchType('albumName');
    setSearchTerm('');
    setMessage('');
    setCurrentPage(1);
    // fetchAlbums('albumName', '');
  };

  // snackbar start
  const [open, setOpen] = React.useState(false);

  //close the snackbar
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
  //end of snackbar

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  return (
    <Container>
      {/* display snackbar if any error happened during API fetch */}
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={errorMessage}
        action={action}
      />
      {/* start of searchbar grid */}
      <Grid container spacing={2} justifyContent="center" sx={{ my: 2 }}>
        <Grid item xs={12} sm={2}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel>Search By</InputLabel>
            <Select
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              label="Search By"
            >
              <MenuItem value="albumName">Album</MenuItem>
              <MenuItem value="artistName">Artist</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label={`Search ${searchType === 'albumName' ? 'Album' : 'Artist'}`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <Button variant="contained" onClick={handleSearch} fullWidth>
            Search
          </Button>
        </Grid>
        <Grid item xs={12} sm={2}>
          <Button variant="contained" onClick={handleClear} fullWidth>
            Clear
          </Button>
        </Grid>
      </Grid>
      {/* end of searchbar grid */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={9}>
          {albums.length > 0 ? (
            <>
              <AlbumGrid albums={albums} wishListId={wishListId} />
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  mt: '3rem',
                  mb: '2rem',
                }}
              >
                <Stack spacing={2}>
                  <Pagination
                    count={totalPages} //6
                    page={currentPage}
                    color="primary"
                    onChange={handlePageChange}
                  />
                </Stack>
              </Box>
            </>
          ) : (
            <Box
              sx={{
                textAlign: 'center',
                mt: '1.25rem',
                mb: '1.25rem',
              }}
            >
              {/* no result found message */}
              <Typography variant="h4">{message}</Typography>
            </Box>
          )}
        </Grid>
        <Grid item xs={12} md={3}>
          <OrderSidebar />
        </Grid>
      </Grid>
    </Container>
  );
};

export default AlbumsList;
