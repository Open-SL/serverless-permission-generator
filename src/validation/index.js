const validate = (values) => {
  const errors = {};

  if (!values.projectName) {
    errors.projectName = 'Required';
  }
  if (!values.accountId) {
    errors.accountId = 'Required';
  }
  if (!values.region) {
    errors.region = 'Required';
  }
  if (!values.stage) {
    errors.stage = 'Required';
  }

  return errors;
};

export default validate;
