import clsx from 'clsx/lite';
import type { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { type Control, useController } from 'react-hook-form';

export type FormInputClasses = Partial<
  Record<
    'container' | 'input' | 'label' | 'notValid' | 'valid' | 'warning',
    string
  >
>;

export type FormInputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  readonly name: string;
  readonly control: Control<any>;
  readonly classes?: FormInputClasses;
  readonly label?: string;
};

const DEFAULT_CLASSES = {};

const FormInput = function FormInput({
  name,
  control,
  classes = DEFAULT_CLASSES,
  label,
  ...props
}: FormInputProps) {
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
