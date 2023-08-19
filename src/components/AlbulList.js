import React, { useState } from 'react';
import axios from 'axios';
import {
  Container,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from '@mui/material';

const AlbumsList = () => {
  const [albums, setAlbums] = useState([]);
  const [page, setPage] = useState(1);
  const [searchType, setSearchType] = useState('album');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchAlbums = async () => {
    try {
      const response = await axios.get(
        'http://localhost:8000/api/v1/albums/filter',
        {
          params: {
            page,
            [searchType]: searchTerm,
          },
        }
      );
      setAlbums(response.data);
    } catch (error) {
      console.error('Error fetching albums:', error);
    }
  };

  const handleSearch = () => {
    setPage(1);
    fetchAlbums();
  };

  const handleClear = () => {
    setSearchType('album');
    setSearchTerm('');
    setPage(1);
    fetchAlbums();
  };

  return (
    <Container>
      <Typography variant="h4">Music Store</Typography>
      <FormControl variant="outlined" margin="normal">
        <InputLabel>Search By</InputLabel>
        <Select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
          label="Search By"
        >
          <MenuItem value="album">Album</MenuItem>
          <MenuItem value="artist">Artist</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label={`Search ${searchType === 'album' ? 'Album' : 'Artist'}`}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        variant="outlined"
        margin="normal"
        fullWidth
      />
      <Button variant="contained" onClick={handleSearch}>
        Search
      </Button>
      <Button variant="contained" onClick={handleClear}>
        Clear
      </Button>
      {albums.map((album) => (
        <div key={album.id}>
          <Typography variant="h6">{album.title}</Typography>
          <Typography>{album.artist}</Typography>
          {/* Add more album details here */}
        </div>
      ))}
    </Container>
  );
};

export default AlbumsList;
