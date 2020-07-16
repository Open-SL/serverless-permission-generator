import React from 'react';
import { Grid, Button, makeStyles, IconButton, Box } from '@material-ui/core';
import { Field, FieldArray } from 'formik';
import { TextField } from 'formik-material-ui';
import RemoveIcon from '@material-ui/icons/Remove';

const useStyles = makeStyles({
  button: {
    borderRadius: 5,
    color: '#FFF',
    backgroundColor: '#fd5750',
    '&:hover': {
      backgroundColor: '#FD8984',
    },
  },
});

export default function ResourcesArray({ values, resourceName, arrayName, resourceAddLabel }) {
  const classes = useStyles();

  return (
    <>
      {values[resourceName] ? (
        <FieldArray
          name={arrayName}
          render={(arrayHelpers) => (
            <>
              {values[arrayName] && values[arrayName].length > 0 ? (
                <>
                  {values[arrayName].map((resource, index) => (
                    <div key={index}>
                      <Grid container direction="row" justify="center" alignItems="center" spacing={1}>
                        <Grid item xs={9}>
                          <Field component={TextField} name={`${arrayName}.${index}`} fullWidth />
                        </Grid>
                        <Grid item xs={3}>
                          <IconButton
                            className={classes.button}
                            component="span"
                            size="small"
                            onClick={() => arrayHelpers.remove(index)} // remove a resource from the list
                          >
                            <RemoveIcon />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </div>
                  ))}
                  <Box m={1}>
                    <Button
                      className={classes.button}
                      onClick={() => arrayHelpers.insert(values[arrayName].length, '')}
                      size="small"
                    >
                      {/* show this when user has removed all resource from the list */}
                      {resourceAddLabel}
                    </Button>
                  </Box>
                </>
              ) : (
                <Button className={classes.button} onClick={() => arrayHelpers.push('')} size="small">
                  {/* show this when user has removed all resource from the list */}
                  {resourceAddLabel}
                </Button>
              )}
            </>
          )}
        />
      ) : null}
    </>
  );
}
