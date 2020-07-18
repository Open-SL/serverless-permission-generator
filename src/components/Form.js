import React from 'react';
import { Typography, Grid, Button, Box, makeStyles } from '@material-ui/core';
import GetAppIcon from '@material-ui/icons/GetApp';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import { Formik, Form as FormikForm, Field } from 'formik';
import { TextField, Checkbox } from 'formik-material-ui';
import ResourcesArray from './ResourcesArray';
import validation from 'validation';

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
});

export default function Form() {
  const classes = useStyles();

  return (
    <>
      <Formik
        initialValues={{
          projectName: '',
          accountId: '',
          stage: '',
          region: '',
          isS3Required: false,
          isSnsRequired: false,
          isSqsRequired: false,
          isApiGWRequired: false,
          isSgRequired: false,
          isKinesisRequired: false,
          isAlbRequired: false,
          isDynamoDbRequired: false,
          s3Array: [],
          dynamoDbArray: [],
          sqsArray: [],
          albArray: [],
          kinesisArray: [],
          snsArray: [],
        }}
        validate={validation}
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
                <Grid item xs={8}>
                  <Typography variant="subtitle1" className={classes.fieldTitle}>
                    Amazon API Gateway
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Field
                    component={Checkbox}
                    type="checkbox"
                    name="isApiGWRequired"
                    inputProps={{ 'aria-label': 'security checkbox' }}
                  />
                </Grid>
              </Grid>

              <Grid container direction="row" justify="center" alignItems="center" spacing={1}>
                <Grid item xs={8}>
                  <Typography variant="subtitle1" className={classes.fieldTitle}>
                    EC2 (Elastic Compute Cloud) Security Groups
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Field
                    component={Checkbox}
                    type="checkbox"
                    name="isSgRequired"
                    inputProps={{ 'aria-label': 'security checkbox' }}
                  />
                </Grid>
              </Grid>

              <Grid container direction="row" justify="center" alignItems="center" spacing={1}>
                <Grid item xs={8}>
                  <Typography variant="subtitle1" className={classes.fieldTitle}>
                    S3 (Simple Static Storage)
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Field
                    component={Checkbox}
                    type="checkbox"
                    name="isS3Required"
                    inputProps={{ 'aria-label': 's3 checkbox' }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <ResourcesArray
                    values={values}
                    resourceName="isS3Required"
                    arrayName="s3Array"
                    resourceAddLabel="add bucket"
                  />
                </Grid>
              </Grid>

              <Grid container direction="row" justify="center" alignItems="center" spacing={1}>
                <Grid item xs={8}>
                  <Typography variant="subtitle1" className={classes.fieldTitle}>
                    DynamoDB
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Field
                    component={Checkbox}
                    type="checkbox"
                    name="isDynamoDbRequired"
                    inputProps={{ 'aria-label': 'dynamoDB checkbox' }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <ResourcesArray
                    values={values}
                    resourceName="isDynamoDbRequired"
                    arrayName="dynamoDbArray"
                    resourceAddLabel="add db"
                  />
                </Grid>
              </Grid>

              <Grid container direction="row" justify="center" alignItems="center" spacing={1}>
                <Grid item xs={8}>
                  <Typography variant="subtitle1" className={classes.fieldTitle}>
                    SNS (Simple Notification Service)
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Field
                    component={Checkbox}
                    type="checkbox"
                    name="isSnsRequired"
                    inputProps={{ 'aria-label': 'sns checkbox' }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <ResourcesArray
                    values={values}
                    resourceName="isSnsRequired"
                    arrayName="snsArray"
                    resourceAddLabel="add topic"
                  />
                </Grid>
              </Grid>

              <Grid container direction="row" justify="center" alignItems="center" spacing={1}>
                <Grid item xs={8}>
                  <Typography variant="subtitle1" className={classes.fieldTitle}>
                    ALB (Application Load Balancer)
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Field
                    component={Checkbox}
                    type="checkbox"
                    name="isAlbRequired"
                    inputProps={{ 'aria-label': 'alb checkbox' }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <ResourcesArray
                    values={values}
                    resourceName="isAlbRequired"
                    arrayName="albArray"
                    resourceAddLabel="add listener"
                  />
                </Grid>
              </Grid>

              <Grid container direction="row" justify="center" alignItems="center" spacing={1}>
                <Grid item xs={8}>
                  <Typography variant="subtitle1" className={classes.fieldTitle}>
                    Amazon Kinesis
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Field
                    component={Checkbox}
                    type="checkbox"
                    name="isKinesisRequired"
                    inputProps={{ 'aria-label': 'security checkbox' }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <ResourcesArray
                    values={values}
                    resourceName="isKinesisRequired"
                    arrayName="kinesisArray"
                    resourceAddLabel="add stream"
                  />
                </Grid>
              </Grid>

              <Grid container direction="row" justify="center" alignItems="center" spacing={1}>
                <Grid item xs={8}>
                  <Typography variant="subtitle1" className={classes.fieldTitle}>
                    SQS (Simple Queue Service)
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Field
                    component={Checkbox}
                    type="checkbox"
                    name="isSqsRequired"
                    inputProps={{ 'aria-label': 'security checkbox' }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <ResourcesArray
                    values={values}
                    resourceName="isSqsRequired"
                    arrayName="sqsArray"
                    resourceAddLabel="add queue"
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
