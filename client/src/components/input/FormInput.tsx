import { type FC } from 'react';
import { Field, ErrorMessage, type FieldAttributes } from 'formik';
import clsx from 'clsx';

export type Props = FieldAttributes<unknown> & {
  label: string;
  classes: Record<string, string>;
};

const FormInput: FC<Props> = ({ classes, label, name, ...rest }) => (
  <Field name={name}>
    {(props: any) => {
      const {
        field,
        meta: { touched, error },
      } = props;

      const inputClassName = clsx(classes.input, {
        [classes.notValid]: touched && error,
        [classes.valid]: touched && !error,
      });
      return (
        <div className={classes.container}>
          <input
            type="text"
            {...field}
            placeholder={label}
            className={inputClassName}
            {...rest}
          />
          <ErrorMessage
            name={name}
            component="span"
            className={classes.warning}
          />
        </div>
      );
    }}
  </Field>
);

export default FormInput;
