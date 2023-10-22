import { type FC } from 'react';
import { ErrorMessage, Field, type FieldAttributes } from 'formik';
import clsx from 'clsx';

export type Props = FieldAttributes<unknown> & {
  label: string;
  classes: Record<string, string>;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const FormTextArea: FC<Props> = ({ label, classes, type, ...rest }) => (
  <Field {...rest}>
    {(props: any) => {
      const {
        field,
        meta: { touched, error },
      } = props;
      const { container, inputStyle, notValid, warning } = classes;
      return (
        <div className={container}>
          <textarea
            {...field}
            placeholder={label}
            className={clsx(inputStyle, {
              [notValid]: touched && error,
            })}
          />
          <ErrorMessage
            name={field.name}
            component="span"
            className={warning}
          />
        </div>
      );
    }}
  </Field>
);

export default FormTextArea;
