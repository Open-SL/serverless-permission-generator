import React from 'react';
import { Typography, Grid, Box } from '@material-ui/core';
import { makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Form from './components/Form';

const fontFamilyMetropolis = {
  fontFamily: [
    'Metropolis',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
  letterSpacing: '0.015rem',
};

const theme = createMuiTheme({
  typography: {
    h1: {
      ...fontFamilyMetropolis,
    },
    h2: {
      ...fontFamilyMetropolis,
    },
    h3: {
      ...fontFamilyMetropolis,
    },
    h4: {
      ...fontFamilyMetropolis,
    },
    h5: {
      ...fontFamilyMetropolis,
    },
    h6: {
      ...fontFamilyMetropolis,
    },
    subtitle1: {
      ...fontFamilyMetropolis,
    },
    button: {
      ...fontFamilyMetropolis,
    },
  },
});

const useStyles = makeStyles({
  subheading: {
    color: '#fd5750',
    fontWeight: '800',
  },
  button: {
    borderRadius: 5,
    color: '#FFF',
    backgroundColor: '#fd5750',
    '&:hover': {
      backgroundColor: '#FD8984',
    },
  },
  fieldTitle: {
    textAlign: 'right',
    fontWeight: '600',
  },
  fieldTitle2: {
    fontWeight: '600',
  },
  header: {
    backgroundColor: '#282c34',
    color: 'white',
    textAlign: 'center',
  },
});

function App() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <div>
        <header className={classes.header}>
          <Box p={2}>
            <Typography variant="h4" component="h1">
              Serverless Permission Policy Generator
            </Typography>
          </Box>
        </header>
        <Grid container>
          <Grid item md={4} xs={12}>
            <Form />
          </Grid>

          <Grid item md={8} xs={12}>
            <Box m={2}>
              <Typography variant="subtitle1" component="h2" className={classes.subheading}>
                Generated Code Here
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  );
}

export default App;
