const validate = (values) => {
  const errors = {};

  // proiect meta data validation 

  if (!values.projectName) {
    errors.projectName = 'Required';
  }
  if (!values.accountId) {
    errors.accountId = 'Required';
  } else if (!/^[0-9\b]+$/.test(values.accountId)) {
    errors.accountId = 'Invalid ID';
  }
  if (!values.region) {
    errors.region = 'Required';
  }
  if (!values.stage) {
    errors.stage = 'Required';
  }

  // project permission validations 

  if (values.isS3Required === true && values.s3Array.length === 0) {
    errors.isS3Required = ' Please add a bucket';
  }

  if (values.isDynamoDbRequired === true && values.dynamoDbArray.length === 0) {
    errors.isDynamoDbRequired = ' Please add a database';
  }

  if (values.isSqsRequired === true && values.sqsArray.length === 0) {
    errors.isSqsRequired = ' Please add a queue';
  }

  if (values.isAlbRequired === true && values.albArray.length === 0) {
    errors.isAlbRequired = ' Please add a listner';
  }

  if (values.isKinesisRequired === true && values.kinesisArray.length === 0) {
    errors.isKinesisRequired = ' Please add a stream';
  }

  if (values.isSnsRequired === true && values.snsArray.length === 0) {
    errors.isSnsRequired = ' Please add a topic';
  }

  return errors;
};

export default validate;
