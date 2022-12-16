import React, { useLayoutEffect } from 'react';
import { Field, ErrorMessage } from 'formik';

const SelectInput = ({
  header,
  classes,
  optionsArray,
  valueArray,
  ...props
}) => {
  const {
    form: { setFieldValue },
    meta: { initialValue },
    field,
  } = props;

  const getOptionsArray = () => {
    const array = [];
    for (let i = 0; optionsArray && i < optionsArray.length; i++) {
      let option;
      if (valueArray) {
        option = (
          <option key={i} value={valueArray[i]}>
            {optionsArray[i]}
          </option>
        );
      } else {
        option = <option key={i}>{optionsArray[i]}</option>;
      }
      array.push(option);
    }
    return array;
  };

  useLayoutEffect(() => {
    if (!initialValue && optionsArray) {
      setFieldValue(field.name, valueArray ? valueArray[0] : optionsArray[0]);
    }
  }, []);

  return (
    <div className={classes.inputContainer}>
      <span className={classes.inputHeader}>{header}</span>
      <select {...field} className={classes.selectInput}>
        {getOptionsArray()}
      </select>
    </div>
  );
};

const SelectInputWrapper = ({
  header,
  classes,
  optionsArray,
  valueArray,
  ...rest
}) => (
  <Field {...rest}>
    {(fieldProps) => (
      <>
        <SelectInput
          {...fieldProps}
          header={header}
          classes={classes}
          optionsArray={optionsArray}
          valueArray={valueArray}
        />
        <ErrorMessage
          name={fieldProps.field.name}
          component="span"
          className={classes.warning}
        />
      </>
    )}
  </Field>
);

export default SelectInputWrapper;
