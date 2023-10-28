import { type DetailedHTMLProps, type InputHTMLAttributes } from 'react';
import { type Control, useController } from 'react-hook-form';
import clsx from 'clsx';

export type FormInputClasses = Partial<
  Record<'container' | 'input' | 'notValid' | 'valid' | 'warning', string>
>;

export type FormInputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  control: Control<any>;
  classes: FormInputClasses;
  name: string;
};

const FormInput = function FormInput({
  control,
  classes,
  name,
  ...props
}: FormInputProps) {
  const {
    field,
    fieldState: { invalid, isTouched, error },
  } = useController({ name, control });

  const inputClassName = clsx(classes.input, {
    [classes.notValid!]: isTouched && invalid,
    [classes.valid!]: isTouched && !invalid,
  });

  return (
    <div className={classes.container}>
      <input className={inputClassName} type="text" {...field} {...props} />
      {error && <span className={classes.warning}>{error.message}</span>}
    </div>
  );
};

export default FormInput;
