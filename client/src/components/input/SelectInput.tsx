import { type FC, useLayoutEffect } from 'react';
import {
  Field,
  ErrorMessage,
  type FieldMetaProps,
  type FieldInputProps,
  type FormikProps,
} from 'formik';
import type { JSX } from 'react/jsx-runtime';

export type Props = {
  header: string;
  classes: Record<string, string>;
  optionsArray: string[];
  valueArray?: number[];
  [key: string]: unknown;
};

export type FieldProps<T = string> = {
  form: FormikProps<T>;
  meta: FieldMetaProps<T>;
  field: FieldInputProps<T>;
};

const SelectInput: FC<Props & FieldProps> = ({
  header,
  classes,
  optionsArray,
  valueArray,
  form: { setFieldValue },
  meta: { initialValue },
  field,
}) => {
  const getOptionsArray = () => {
    const array: JSX.Element[] = [];
    for (let i = 0; optionsArray && i < optionsArray.length; i++) {
      array.push(
        <option key={i} value={valueArray ? valueArray[i] : undefined}>
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

const SelectInputWrapper: FC<Props> = ({
  header,
  classes,
  optionsArray,
  valueArray,
  ...rest
}) => (
  <Field {...rest}>
    {(fieldProps: FieldProps) => (
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
