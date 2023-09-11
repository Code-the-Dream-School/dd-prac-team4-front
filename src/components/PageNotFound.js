import React from 'react';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import { Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import NavigateButton from './layout/NavigateButton/NavigateButton';

import imgPageNotFound from '../images/page-not-found.jpg';

const theme = createTheme({
  palette: {
    background: {
      default: '#ffffff',
      paper: '#eae9e9',
    },
    text: {
      primary: '#000000',
    },
    shadow: {
      boxShadow: `
  0px 0px 0px 0.5px rgba(50, 50, 93, 0.1),
  0px 2px 5px 0px rgba(50, 50, 93, 0.1),
  0px 1px 1.5px 0px rgba(0, 0, 0, 0.07)
`,
    },
  },
});

const NotFoundImage = styled('img')({
  width: '100%',
  height: 'auto',
  objectFit: 'cover',
});

const NotFoundBody = styled('div')({
  backgroundColor: theme.palette.background.default,
  marginTop: '1rem',
});
const NotFoundPageContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: 'calc(100vh - 4rem)', // header with a height of 4rem;
});

const NotFoundWrapper = styled('div')({
  backgroundColor: theme.palette.background.paper,
  maxWidth: '37.5rem',
  borderRadius: theme.spacing(1.5),
  padding: theme.spacing(2),
  margin: theme.spacing(2),
  boxShadow: theme.palette.shadow.boxShadow,
});

function PageNotFound() {
  return (
    <ThemeProvider theme={theme}>
      <NotFoundBody>
        <NotFoundPageContainer>
          <NotFoundWrapper>
            <Typography
              variant="h6"
              style={{
                fontSize: '1.25rem',
                fontWeight: 'bold',
                marginBottom: theme.spacing(1),
                color: theme.palette.text.primary,
              }}
            >
              The requested page does not exist.
            </Typography>
            <NotFoundImage src={imgPageNotFound} alt="Page not found" />
            <NavigateButton
              linkName={'/'}
              variant={'contained'}
              color={'primary'}
              startIcon={<ArrowBackIcon />}
              children={'Go to home page'}
              style={{ marginTop: theme.spacing(3) }}
            />
          </NotFoundWrapper>
        </NotFoundPageContainer>
      </NotFoundBody>
    </ThemeProvider>
  );
}

export default PageNotFound;
