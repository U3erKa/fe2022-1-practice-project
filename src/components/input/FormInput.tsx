import clsx from 'clsx/lite';
import type { ComponentPropsWithoutRef } from 'react';
import {
  useController,
  type FieldValues,
  type UseControllerProps,
} from 'react-hook-form';

export type FormInputClasses = Partial<
  Record<
    'container' | 'input' | 'label' | 'notValid' | 'valid' | 'warning',
    string
  >
>;

export type FormInputProps<T extends FieldValues> =
  ComponentPropsWithoutRef<'input'> &
    Pick<UseControllerProps<T>, 'control' | 'name'> & {
      readonly classes?: FormInputClasses;
      readonly label?: string;
    };

const DEFAULT_CLASSES = {};

const FormInput = <T extends FieldValues>({
  name,
  control,
  classes = DEFAULT_CLASSES,
  label,
  ...props
}: FormInputProps<T>) => {
  const {
    field,
    fieldState: { invalid, isTouched, error },
  } = useController({ name, control });

  return (
    <label className={classes.container}>
      {label ? <p className={classes.label}>{label}</p> : null}
      <input
        type="text"
        className={clsx(
          classes.input,
          isTouched && (invalid ? classes.notValid : classes.valid),
        )}
        {...field}
        {...props}
      />
      {error ? <p className={classes.warning}>{error.message}</p> : null}
    </label>
  );
};

export default FormInput;
