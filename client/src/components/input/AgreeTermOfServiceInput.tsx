import { type FC } from 'react';
import { Field, type FieldAttributes } from 'formik';

export type Props = FieldAttributes<unknown> & {
  label: string;
  classes: Record<string, string>;
};

const AgreeTermOfServiceInput: FC<Props> = ({
  id,
  type,
  classes,
  label = '',
  ...rest
}) => (
  <Field {...rest}>
    {(props: any) => {
      const {
        meta: { touched, error },
        field,
      } = props;

      return (
        <div>
          <div className={classes.container}>
            <input {...field} placeholder={label} id={id} type={type} />
            <label htmlFor={id}>
              By clicking this checkbox, you agree to our{' '}
              <a href="https://www.google.com" target="_blank" rel="noreferrer">
                Terms of Service.
              </a>
            </label>
          </div>
          {touched && error && <span className={classes.warning}>{error}</span>}
        </div>
      );
    }}
  </Field>
);

export default AgreeTermOfServiceInput;
