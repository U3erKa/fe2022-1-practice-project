'use client';

import { useEffect, type ComponentPropsWithoutRef } from 'react';
import {
  useController,
  type FieldValues,
  type UseControllerProps,
} from 'react-hook-form';

export type FormSelectClasses = {
  inputContainer?: string;
  inputHeader?: string;
  selectInput?: string;
  warning?: string;
};

export type FormSelectProps<T extends FieldValues> =
  ComponentPropsWithoutRef<'select'> &
    Pick<UseControllerProps<T>, 'control' | 'name'> & {
      readonly header: string;
      readonly classes: FormSelectClasses;
      readonly optionsArray: readonly string[];
      readonly valueArray?: readonly number[];
    };

const OPTIONS_ARRAY: string[] = [];

const SelectInput = function SelectInput<T extends FieldValues>({
  name,
  control,
  header,
  classes,
  optionsArray = OPTIONS_ARRAY,
  valueArray,
  ...rest
}: FormSelectProps<T>) {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  useEffect(() => {
    if (optionsArray.length) {
      field.onChange(valueArray ? valueArray[0] : optionsArray[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <label className={classes.inputContainer}>
        <p className={classes.inputHeader}>{header}</p>
        <select className={classes.selectInput} {...field} {...rest}>
          {optionsArray?.map((option, i) => (
            <option key={option} value={valueArray ? valueArray[i] : undefined}>
              {option}
            </option>
          ))}
        </select>
      </label>
      {error ? <p className={classes.warning}>{error.message}</p> : null}
    </>
  );
};

export default SelectInput;
