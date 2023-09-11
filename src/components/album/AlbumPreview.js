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
    //extract the album id
    const albumId = match[1];
    //  Spotify album URL
    const spotifyAlbumUrl = `https://open.spotify.com/embed/album/${albumId}`;
    setSpotifyUrl(spotifyAlbumUrl);
  }, [apiUrl]);

  return (
    <Card variant="outlined">
      <CardContent>
        <div style={{ marginTop: '1rem' }}>
          <iframe
            title="Spotify Web Player"
            src={spotifyUrl}
            width={width}
            height={height}
            frameBorder={frameBorder}
            style={{ borderRadius: 8, ...style }}
            allow={allow}
            {...props}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default AlbumPreview;
