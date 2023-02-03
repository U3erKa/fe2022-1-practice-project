import React from 'react';
import classNames from 'classnames';
import InputMask from 'react-input-mask';
import { useField } from 'formik';

const PayInput = props => {
  const { label, changeFocus, classes, isInputMask, mask } = props;
  const [field, meta, helpers] = useField(props.name);
  const { touched, error } = meta;

  if (field.name === 'sum') {
    return (
      <div className={classes.container}>
        <input
          {...field}
          placeholder={label}
          className={classNames(classes.input, {
            [classes.notValid]: touched && error,
          })}
        />
        {touched && error && (
          <span className={classes.error}>{error.message}!</span>
        )}
      </div>
    );
  }
  if (isInputMask) {
    return (
      <div className={classes.container}>
        <InputMask
          mask={mask}
          maskChar={null}
          {...field}
          placeholder={label}
          className={classNames(classes.input, {
            [classes.notValid]: touched && error,
          })}
          onFocus={() => changeFocus(field.name)}
        />
        {touched && error && (
          <span className={classes.error}>{error.message}!</span>
        )}
      </div>
    );
  }
  return (
    <div className={classes.container}>
      <input
        {...field}
        placeholder={label}
        className={classNames(classes.input, {
          [classes.notValid]: touched && error,
        })}
        onFocus={() => changeFocus(field.name)}
      />
      {touched && error && (
        <span className={classes.error}>{error.message}!</span>
      )}
    </div>
  );
};

export default PayInput;
