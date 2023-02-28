import { useLayoutEffect } from 'react';
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
    const array: JSX.Element[] = [];
    for (let i = 0; i < optionsArray?.length; i++) {
      array.push(
        <option key={i} value={valueArray[i] || null}>
          {optionsArray[i]}
        </option>,
      );
    }
    return array;
  };

  useLayoutEffect(() => {
    if (!initialValue && optionsArray) {
      setFieldValue(field.name, valueArray ? valueArray[0] : optionsArray[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
