import React from 'react';
import { Typography, Grid, Button, Box, makeStyles, IconButton } from '@material-ui/core';
import GetAppIcon from '@material-ui/icons/GetApp';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import { Formik, Form as FormikForm, Field, FieldArray } from 'formik';
import { TextField, Checkbox } from 'formik-material-ui';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

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

export default function Form() {
  const classes = useStyles();

  return (
    <>
      <Formik
        initialValues={{
          s3: false,
          sns: false,
          ec2: false,
          ses: false,
          dynamodb: false,
          s3Array: [],
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            setSubmitting(false);
            alert(JSON.stringify(values, null, 2));
          }, 500);
        }}
      >
        {({ submitForm, isSubmitting, values }) => (
          <FormikForm>
            <Box m={2}>
              <Typography variant="h6" component="h2" className={classes.subheading}>
                Project Meta Data
              </Typography>

              <Grid container direction="row" justify="center" alignItems="center" spacing={1}>
                <Grid item xs>
                  <Typography variant="subtitle1" className={classes.fieldTitle}>
                    Serverless Project Name
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Field component={TextField} fullWidth name="projectName" InputLabelProps={{ shrink: false }} />
                </Grid>
              </Grid>

              <Grid container direction="row" justify="center" alignItems="center" spacing={1}>
                <Grid item xs>
                  <Typography variant="subtitle1" className={classes.fieldTitle}>
                    AWS Account ID
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Field component={TextField} name="accountId" InputLabelProps={{ shrink: false }} fullWidth />
                </Grid>
              </Grid>

              <Grid container direction="row" justify="center" alignItems="center" spacing={1}>
                <Grid item xs>
                  <Typography variant="subtitle1" className={classes.fieldTitle}>
                    AWS Region
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Field component={TextField} name="region" InputLabelProps={{ shrink: false }} fullWidth />
                </Grid>
              </Grid>

              <Grid container direction="row" justify="center" alignItems="center" spacing={1}>
                <Grid item xs>
                  <Typography variant="subtitle1" className={classes.fieldTitle}>
                    Application Stage
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Field component={TextField} name="stage" InputLabelProps={{ shrink: false }} fullWidth />
                </Grid>
              </Grid>
            </Box>

            {/* Second Part */}
            <Box m={2}>
              <Typography variant="h6" component="h2" className={classes.subheading}>
                Project Permission
              </Typography>

              <Grid container direction="row" justify="center" alignItems="center" spacing={1}>
                <Grid item xs>
                  <Typography variant="subtitle1" className={classes.fieldTitle}>
                    S3 (Simple Static Storage)
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Field
                    component={Checkbox}
                    type="checkbox"
                    name="s3"
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FieldArray
                    name="s3Array"
                    render={(arrayHelpers) => (
                      <>
                        {values.s3Array && values.s3Array.length > 0 ? (
                          values.s3Array.map((bucket, index) => (
                            <div key={index}>
                              <Grid container direction="row" justify="center" alignItems="center" spacing={1}>
                                <Grid item xs={9}>
                                  <Field component={TextField} name={`s3Array.${index}`} fullWidth />
                                </Grid>
                                <Grid item xs={3}>
                                  <IconButton
                                    className={classes.button}
                                    component="span"
                                    size="small"
                                    onClick={() => arrayHelpers.remove(index)} // remove a bucket from the list
                                  >
                                    <RemoveIcon />
                                  </IconButton>
                                  {values.s3Array.length - 1 === index ? (
                                    <IconButton
                                      className={classes.button}
                                      component="span"
                                      size="small"
                                      onClick={() => arrayHelpers.insert(index, '')}
                                      // insert an empty string at a position
                                    >
                                      <AddIcon />
                                    </IconButton>
                                  ) : null}
                                </Grid>
                              </Grid>
                            </div>
                          ))
                        ) : (
                          <Button className={classes.button} onClick={() => arrayHelpers.push('')} size="small">
                            {/* show this when user has removed all s3 from the list */}
                            Add a bucket
                          </Button>
                        )}
                      </>
                    )}
                  />
                </Grid>
              </Grid>

              <Grid container direction="row" justify="center" alignItems="center" spacing={1}>
                <Grid item xs>
                  <Typography variant="subtitle1" className={classes.fieldTitle}>
                    DynamoDB
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Field
                    component={Checkbox}
                    type="checkbox"
                    name="dynamodb"
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                  />
                </Grid>
              </Grid>

              <Grid container direction="row" justify="center" alignItems="center" spacing={1}>
                <Grid item xs>
                  <Typography variant="subtitle1" className={classes.fieldTitle}>
                    SNS (Simple Notification Service)
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Field
                    component={Checkbox}
                    type="checkbox"
                    name="sns"
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                  />
                </Grid>
              </Grid>

              <Grid container direction="row" justify="center" alignItems="center" spacing={1}>
                <Grid item xs>
                  <Typography variant="subtitle1" className={classes.fieldTitle}>
                    SES (Simple Email Service)
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Field
                    component={Checkbox}
                    type="checkbox"
                    name="ses"
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                  />
                </Grid>
              </Grid>

              <Grid container direction="row" justify="center" alignItems="center" spacing={1}>
                <Grid item xs>
                  <Typography variant="subtitle1" className={classes.fieldTitle}>
                    EC2 (Elastic Compute Cloud)
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Field
                    component={Checkbox}
                    type="checkbox"
                    name="ec2"
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                  />
                </Grid>
              </Grid>

              <Grid container direction="row" justify="center" alignItems="center" spacing={2}>
                <Grid item>
                  <Button className={classes.button} variant="contained" size="small" startIcon={<FileCopyIcon />}>
                    Copy
                  </Button>
                </Grid>

                <Grid item>
                  <Button
                    className={classes.button}
                    variant="contained"
                    size="small"
                    disabled={isSubmitting}
                    onClick={submitForm}
                    startIcon={<GetAppIcon />}
                  >
                    download
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </FormikForm>
        )}
      </Formik>
    </>
  );
}
