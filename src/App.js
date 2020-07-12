import React from "react";
//import logo from './logo.svg';
import "./App.css";
import {
  FormControl,
  TextField,
  RadioGroup,
  Radio,
  FormControlLabel,
  Switch,
  Typography,
  Grid,
  Button,
  Box,
} from "@material-ui/core";

import GetAppIcon from "@material-ui/icons/GetApp";

function App() {
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <div>
      <header className="App-header">
        Serverless Permission Policy Generator
      </header>
      <Grid container>
        <Grid item xs={6}>
          <FormControl>
            <Box m={2}>
              <Typography variant="h5" component="h2">
                Project Meta Data
              </Typography>

              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                spacing="1"
              >
                <Grid item xs>
                  <Typography variant="h6"> Project Name </Typography>
                </Grid>
                <Grid item xs>
                  <TextField
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
                spacing="1"
              >
                <Grid item xs>
                  <Typography variant="h6"> Group </Typography>
                </Grid>
                <Grid item xs>
                  <TextField
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
                spacing="1"
              >
                <Grid item xs>
                  <Typography variant="h6"> Role Name</Typography>
                </Grid>
                <Grid item xs>
                  <TextField
                    id="standard-search"
                    InputLabelProps={{ shrink: false }}
                  />
                </Grid>
              </Grid>
            </Box>
            {/* Second Part */}
            <Box m={2}>
              <Typography variant="h5" component="h2">
                Project Dependencies
              </Typography>

              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                spacing="1"
              >
                <Grid item>
                  <Typography component="div">
                    <Typography variant="h6"> Test Button 1</Typography>
                    <Grid
                      component="label"
                      container
                      alignItems="center"
                      spacing={1}
                    >
                      <Grid item>Off</Grid>
                      <Grid item>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={state.checkedA}
                              onChange={handleChange}
                              name="checkedA"
                            />
                          }
                        />
                      </Grid>
                      <Grid item>On</Grid>
                    </Grid>
                  </Typography>
                </Grid>
              </Grid>

              {/* first radio button field */}
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                spacing="1"
              >
                <Grid item xs>
                  <Typography variant="h6"> Packaging </Typography>
                </Grid>

                <RadioGroup
                  aria-label="Packaging"
                  name="Packaging1"
                  onChange={handleChange}
                >
                  <Grid item>
                    <FormControlLabel
                      value="test1"
                      control={<Radio />}
                      label="test1"
                    />
                    <FormControlLabel
                      value="test2"
                      control={<Radio />}
                      label="test2"
                    />
                  </Grid>
                </RadioGroup>
              </Grid>

              {/* second radio button field */}
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                spacing="1"
              >
                <Grid item xs>
                  <Typography variant="h6"> Version </Typography>
                </Grid>

                <RadioGroup
                  aria-label="version"
                  name="version1"
                  onChange={handleChange}
                >
                  <Grid item>
                    <FormControlLabel
                      value="test1"
                      control={<Radio />}
                      label="test1"
                    />
                    <FormControlLabel
                      value="test2"
                      control={<Radio />}
                      label="test2"
                    />
                  </Grid>
                </RadioGroup>
              </Grid>

              <Button
                variant="contained"
                color="primary"
                size="large"
                startIcon={<GetAppIcon />}
              >
                Generate
              </Button>
            </Box>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          12
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
