import React from "react";
//import logo from './logo.svg';
import "./App.css";
import { TextField, Typography, Grid, Button, Box } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import {
  makeStyles,
  ThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";
import GetAppIcon from "@material-ui/icons/GetApp";
import FileCopyIcon from '@material-ui/icons/FileCopy';

const fontFamilyMetropolis = {
  fontFamily: [
    "Metropolis",
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(","),
  letterSpacing: "0.015rem",
};

const theme = createMuiTheme({
  typography: {
    // fontFamily: ['Merriweather', 'Georgia', 'serif'].join(','),
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
    // body1: {
    //   ...fontFamilyMetropolis,
    // },
    subtitle1: {
      ...fontFamilyMetropolis,
    },
    button: {
      ...fontFamilyMetropolis,
    },
  },
  // palette: {
  //   type: 'dark',
  //   primary: {
  //     main: #BB86FC,
  //     // contrastText: '#fff',
  //   },
  // },
});

const useStyles = makeStyles({
  subheading: {
    // textDecorationColor: "#fd5750",
    color: "#fd5750",
    fontWeight: "800",

    // textDecoration: "underline",
  },
  button: {
    borderRadius: 5,
    color: "#FFF",
    backgroundColor: "#fd5750",
    "&:hover": {
      backgroundColor: "#FD8984",
    },
  },
  fieldTitle: {
    textAlign: "right",
    fontWeight: "600",
  },
  fieldTitle2: {
    fontWeight: "600",
  },
  header: {
    backgroundColor: "#282c34",
    // min-height: 10vh;
    // display: flex;
    // flex-direction: column;
    // align-items: center;
    // justify-content: center;
    // font-size: calc(20px + 2vmin);
    color: "white",
    textAlign: "center",
  },
});

function App() {
  const classes = useStyles();

  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

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
            <Box m={2}>
              <Typography
                variant="h6"
                component="h2"
                className={classes.subheading}
              >
                Project Meta Data
              </Typography>

              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                spacing={1}
              >
                <Grid item xs>
                  <Typography
                    variant="subtitle1"
                    className={classes.fieldTitle}
                  >
                    Serverless Project Name
                  </Typography>
                </Grid>
                <Grid item xs>
                  <TextField
                    fullWidth
                    id="standard-search"
                    InputLabelProps={{ shrink: false }}
                  />
                </Grid>
              </Grid>

              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                spacing={1}
              >
                <Grid item xs>
                  <Typography
                    variant="subtitle1"
                    className={classes.fieldTitle}
                  >
                    {" "}
                    AWS Account ID{" "}
                  </Typography>
                </Grid>
                <Grid item xs>
                  <TextField
                    id="standard-search"
                    InputLabelProps={{ shrink: false }}
                    fullWidth
                  />
                </Grid>
              </Grid>

              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                spacing={1}
              >
                <Grid item xs>
                  <Typography
                    variant="subtitle1"
                    className={classes.fieldTitle}
                  >
                    {" "}
                    AWS Region{" "}
                  </Typography>
                </Grid>
                <Grid item xs>
                  <TextField
                    id="standard-search"
                    InputLabelProps={{ shrink: false }}
                    fullWidth
                  />
                </Grid>
              </Grid>

              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                spacing={1}
              >
                <Grid item xs>
                  <Typography
                    variant="subtitle1"
                    className={classes.fieldTitle}
                  >
                    {" "}
                    Application Stage{" "}
                  </Typography>
                </Grid>
                <Grid item xs>
                  <TextField
                    id="standard-search"
                    InputLabelProps={{ shrink: false }}
                    fullWidth
                  />
                </Grid>
              </Grid>
            </Box>

            {/* Second Part */}
            <Box m={2}>
              <Typography
                variant="h6"
                component="h2"
                className={classes.subheading}
              >
                Project Permission
              </Typography>

              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                spacing={1}
              >
                <Grid item xs>
                  <Typography
                    variant="subtitle1"
                    className={classes.fieldTitle}
                  >
                    S3 (Simple Static Storage)
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Checkbox
                    checked={state.checked}
                    onChange={handleChange}
                    inputProps={{ "aria-label": "primary checkbox" }}
                  />
                </Grid>
              </Grid>

              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                spacing={1}
              >
                <Grid item xs>
                  <Typography
                    variant="subtitle1"
                    className={classes.fieldTitle}
                  >
                    DynamoDB
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Checkbox
                    checked={state.checked}
                    onChange={handleChange}
                    inputProps={{ "aria-label": "primary checkbox" }}
                  />
                </Grid>
              </Grid>

              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                spacing={1}
              >
                <Grid item xs>
                  <Typography
                    variant="subtitle1"
                    className={classes.fieldTitle}
                  >
                    SNS (Simple Notification Service)
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Checkbox
                    checked={state.checked}
                    onChange={handleChange}
                    inputProps={{ "aria-label": "primary checkbox" }}
                  />
                </Grid>
              </Grid>

              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                spacing={1}
              >
                <Grid item xs>
                  <Typography
                    variant="subtitle1"
                    className={classes.fieldTitle}
                  >
                    SES (Simple Email Service)
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Checkbox
                    checked={state.checked}
                    onChange={handleChange}
                    inputProps={{ "aria-label": "primary checkbox" }}
                  />
                </Grid>
              </Grid>

              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                spacing={1}
              >
                <Grid item xs>
                  <Typography
                    variant="subtitle1"
                    className={classes.fieldTitle}
                  >
                    EC2 (Elastic Compute Cloud)
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Checkbox
                    checked={state.checked}
                    onChange={handleChange}
                    inputProps={{ "aria-label": "primary checkbox" }}
                  />
                </Grid>
              </Grid>

              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                spacing={2}
              >
                <Grid item>
                  <Button
                    className={classes.button}
                    variant="contained"
                    size="small"
                    startIcon={<FileCopyIcon />}
                  >
                    Copy
                  </Button>
                </Grid>

                <Grid item>
                  <Button
                    className={classes.button}
                    variant="contained"
                    size="small"
                    startIcon={<GetAppIcon />}
                  >
                    download
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>

          <Grid item md={8} xs={12}>
            <Box m={2}>
              <Typography
                variant="subtitle1"
                component="h2"
                className={classes.subheading}
              >
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
