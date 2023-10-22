import type { AnySchema, ValidationError } from 'yup';

const validator = (schema: AnySchema) => (values: Record<string, string>) => {
  const errors: Record<string, string> = {};
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
