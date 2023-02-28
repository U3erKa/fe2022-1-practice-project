import type { ValidationError, AnySchema } from 'yup';

const validator = (schema: AnySchema) => (values) => {
  const errors = {};
  try {
    schema.validateSync(values, { abortEarly: false });
    return errors;
  } catch (err) {
    (err as ValidationError).inner.forEach((error) => {
      errors[error.path!] = error.message;
    });
    return errors;
  }
};

export default validator;
