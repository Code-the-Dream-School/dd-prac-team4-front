import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

function ThemeSwitcher({ toggleDarkMode }) {
  const theme = useTheme();

  return (
    <Box>
      <IconButton
        sx={{ ml: 1 }}
        onClick={() => {
          toggleDarkMode(theme.palette.mode === 'light' ? 'dark' : 'light');
        }}
        color="inherit"
      >
        {theme.palette.mode === 'dark' ? (
          <Brightness7Icon />
        ) : (
          <Brightness4Icon />
        )}
      </IconButton>
    </Box>
  );
}

export default ThemeSwitcher;
