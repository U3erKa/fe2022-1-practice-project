import React from 'react';
import classNames from 'classnames';
import { Field, ErrorMessage } from 'formik';

const FormTextArea = ({ label, classes, type, ...rest }) => (
  <Field {...rest}>
    {props => {
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
            className={classNames(inputStyle, {
              [notValid]: touched && error,
            })}
          />
          <ErrorMessage
            name={field.name}
            component='span'
            className={warning}
          />
        </div>
      );
    }}
  </Field>
);

export default FormTextArea;
