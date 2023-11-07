import { Schema, type ZodError } from 'zod';

const validator = (schema: Schema) => (values: Record<string, string>) => {
  const errors: Record<string, string> = {};
  try {
    schema.parse(values);
    return errors;
  } catch (err) {
    (err as ZodError).errors.forEach((error) => {
      errors[error.path.join('.')] = error.message;
    });
    return errors;
  }
};

export default validator;
