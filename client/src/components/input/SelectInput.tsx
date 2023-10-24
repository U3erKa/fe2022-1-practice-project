import { type FC, useLayoutEffect } from 'react';
import {
  ErrorMessage,
  Field,
  type FieldInputProps,
  type FieldMetaProps,
  type FormikProps,
} from 'formik';

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
        {optionsArray?.map((_, i) => (
          <option key={i} value={valueArray ? valueArray[i] : undefined}>
            {optionsArray[i]}
          </option>
        ))}
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
