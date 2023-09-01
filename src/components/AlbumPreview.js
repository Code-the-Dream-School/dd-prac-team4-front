import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const AlbumPreview = ({
  apiUrl,
  style = {},
  wide = false,
  width = wide ? '100%' : 300,
  height = wide ? 80 : 380,
  frameBorder = 0,
  allow = 'encrypted-media',
  ...props
}) => {
  const [spotifyUrl, setSpotifyUrl] = useState('');

  useEffect(() => {
    // regular expression pattern to extract the album ID from the API URL
    const regexPattern = /\/albums\/([a-zA-Z0-9]+)/;

    //  extract the album ID
    const match = apiUrl.match(regexPattern);

    if (!match) {
      // if URL doesn't match the expected format
      console.error('Invalid API URL');
      return;
    }

    // Extract the album ID from the match
    const albumId = match[1];

    //  Spotify album URL
    const spotifyAlbumUrl = `https://open.spotify.com/album/${albumId}`;

    setSpotifyUrl(spotifyAlbumUrl);
  }, [apiUrl]);

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h6" component="div">
          Album Preview
        </Typography>
        <div style={{ marginTop: '1rem' }}>
          <iframe
            title="Spotify Web Player"
            src={spotifyUrl}
            width={width}
            height={height}
            allow={allow}
            style={{ borderRadius: 8, ...style }}
            {...props}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default AlbumPreview;
