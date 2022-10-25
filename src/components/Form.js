import React from 'react';
import { Typography, Grid, Button, Box, makeStyles, FormHelperText } from '@material-ui/core';
import BuildIcon from '@material-ui/icons/Build';
import { Formik, Form as FormikForm, Field } from 'formik';
import { TextField, Checkbox } from 'formik-material-ui';
import ResourcesArray from './ResourcesArray';
import validation from 'validation';
import generator from 'generator';

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
  helperText: {
    color: '#f02e2e',
  },
});

export default function Form({ setPolicy }) {
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
          isDomainManagerRequired: false,
          isDomainManagerRoute53Required: false,
          isApiGWRequired: false,
          isSgRequired: false,
          isKinesisRequired: false,
          isAlbRequired: false,
          isDynamoDbRequired: false,
          isSsmRequired: false,
          isEsmEnabled: false,
          s3Array: [],
          dynamoDbArray: [],
          sqsArray: [],
          albArray: [],
          kinesisArray: [],
          snsArray: [],
          isWarmUpPluginRequired: false,
          warmUpPluginRuleArray: []
        }}
        validate={validation}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
          setPolicy(generator(values));
        }}
      >
        {({ submitForm, isSubmitting, values, errors }) => (
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
                    inputProps={{ 'aria-label': 'api gateway checkbox' }}
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
                    inputProps={{ 'aria-label': 'security group checkbox' }}
                  />
                </Grid>
              </Grid>

              <Grid container direction="row" justify="center" alignItems="center" spacing={1}>
                <Grid item xs={8}>
                  <Typography variant="subtitle1" className={classes.fieldTitle}>
                    Parameter Store
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Field
                    component={Checkbox}
                    type="checkbox"
                    name="isSsmRequired"
                    inputProps={{ 'aria-label': 'parameter store access checkbox' }}
                  />
                </Grid>
              </Grid>

              <Grid container direction="row" justify="center" alignItems="center" spacing={1}>
                <Grid item xs={8}>
                  <Typography variant="subtitle1" className={classes.fieldTitle}>
                    Enable event source mapping
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Field
                    component={Checkbox}
                    type="checkbox"
                    name="isEsmEnabled"
                    inputProps={{ 'aria-label': 'event source mapping checkbox' }}
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

                <Grid item xs={12}>
                {errors.isS3Required && (
                  <>
                    <FormHelperText className={classes.helperText}>{errors.isS3Required}</FormHelperText>
                  </>
                )}
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

                
                <Grid item xs={12}>
                {errors.isDynamoDbRequired && (
                  <FormHelperText className={classes.helperText}>{errors.isDynamoDbRequired}</FormHelperText>
                )}
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

                
                <Grid item xs={12}>
                {errors.isSnsRequired && (
                  <FormHelperText className={classes.helperText}>{errors.isSnsRequired}</FormHelperText>
                )}
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

                <Grid item xs={12}>
                {errors.isAlbRequired && (
                  <FormHelperText className={classes.helperText}>{errors.isAlbRequired}</FormHelperText>
                )}
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
                    inputProps={{ 'aria-label': 'kinesis checkbox' }}
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

                <Grid item xs ={12}>
                {errors.isKinesisRequired && (
                  <FormHelperText className={classes.helperText}>{errors.isKinesisRequired}</FormHelperText>
                )}
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
                    inputProps={{ 'aria-label': 'sqs checkbox' }}
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

                <Grid item xs ={12}>
                  {errors.isSqsRequired && (
                    <FormHelperText className={classes.helperText}>{errors.isSqsRequired}</FormHelperText>
                  )}
                </Grid>
              </Grid>

              <Grid container direction="row" justify="center" alignItems="center" spacing={1}>
                <Grid item xs={8}>
                  <Typography variant="subtitle1" className={classes.fieldTitle}>
                    Serverless Domain Manager
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Field
                    component={Checkbox}
                    type="checkbox"
                    name="isDomainManagerRequired"
                    inputProps={{ 'aria-label': 'sqs checkbox' }}
                  />
                </Grid>

                {values.isDomainManagerRequired && <>
                  <Grid item xs={6}>
                    <Typography variant="subtitle1" className={classes.fieldTitle}>
                      Allow Route53
                  </Typography>
                  </Grid>
                  <Grid item xs>
                    <Field
                      component={Checkbox}
                      type="checkbox"
                      name="isDomainManagerRoute53Required"
                      inputProps={{ 'aria-label': 'sqs checkbox' }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    {errors.isDomainManagerRoute53Required && (
                      <FormHelperText className={classes.helperText}>{errors.isDomainManagerRoute53Required}</FormHelperText>
                    )}
                  </Grid></>
                }
              </Grid>

              <Grid container direction="row" justify="center" alignItems="center" spacing={1}>
                <Grid item xs={8}>
                  <Typography variant="subtitle1" className={classes.fieldTitle}>
                    Serverless Warm Up Plugin
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Field
                    component={Checkbox}
                    type="checkbox"
                    name="isWarmUpPluginRequired"
                    inputProps={{ 'aria-label': 'warm up checkbox' }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <ResourcesArray
                    values={values}
                    resourceName="isWarmUpPluginRequired"
                    arrayName="warmUpPluginRuleArray"
                    resourceAddLabel="add rule"
                  />
                </Grid>

                <Grid item xs={12}>
                {errors.isWarmUpPluginRequired && (
                  <>
                    <FormHelperText className={classes.helperText}>{errors.isWarmUpPluginRequired}</FormHelperText>
                  </>
                )}
                </Grid>
              </Grid>

              <Grid container direction="row" justify="center" alignItems="center" spacing={2}>
                <Grid item>
                  <Button
                    className={classes.button}
                    variant="contained"
                    size="small"
                    disabled={isSubmitting}
                    onClick={submitForm}
                    startIcon={<BuildIcon />}
                  >
                    Generate
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
