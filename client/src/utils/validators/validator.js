import { Schema } from 'yup';

const validator = schema => values => {
  const errors = {};
  try {
    schema.validateSync(values, { abortEarly: false });
    return errors;
  } catch (err) {
    err.inner.forEach(error => {
      errors[error.path] = error.message;
    });
    return errors;
  }
};

export default validator;
