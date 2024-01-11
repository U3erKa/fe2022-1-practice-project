import { type ComponentProps, type FC, useEffect } from 'react';
import { type Control, useController } from 'react-hook-form';

export type FormSelectClasses = {
  inputContainer?: string;
  inputHeader?: string;
  selectInput?: string;
  warning?: string;
};

export type FormSelectProps = ComponentProps<'select'> & {
  readonly name: string;
  readonly control: Control<any>;
  readonly header: string;
  readonly classes: FormSelectClasses;
  readonly optionsArray: readonly string[];
  readonly valueArray?: readonly number[];
};

const SelectInput: FC<FormSelectProps> = function SelectInput({
  name,
  control,
  header,
  classes,
  optionsArray,
  valueArray,
  ...rest
}) {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  useEffect(() => {
    if (optionsArray) {
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
