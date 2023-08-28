import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const AlbumPreview = ({ spotifyUrl }) => {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h6" component="div">
          Album Preview
        </Typography>
        <div style={{ marginTop: '1rem' }}>
          <Spotify link={spotifyUrl} />
        </div>
      </CardContent>
    </Card>
  );
};

const Spotify = ({
  link,
  style = {},
  wide = false,
  width = wide ? '100%' : 300,
  height = wide ? 80 : 380,
  frameBorder = 0,
  allow = 'encrypted-media',
  ...props
}) => {
  const url = new URL(link);
  return (
    <iframe
      title="Spotify Web Player"
      src={`https://open.spotify.com/embed${url.pathname}`}
      width={width}
      height={height}
      allow={allow}
      style={{
        borderRadius: 8,
        ...style,
      }}
      {...props}
    />
  );
};

export default AlbumPreview;
