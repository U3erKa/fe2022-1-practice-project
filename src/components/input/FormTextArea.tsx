import clsx from 'clsx/lite';
import type { ComponentPropsWithoutRef } from 'react';
import {
  type FieldValues,
  type UseControllerProps,
  useController,
} from 'react-hook-form';

export type Props<T extends FieldValues> =
  ComponentPropsWithoutRef<'textarea'> &
    Pick<UseControllerProps<T>, 'control' | 'name'> & {
      readonly classes: Partial<
        Record<'container' | 'inputStyle' | 'notValid' | 'warning', string>
      >;
    };

function FormTextArea<T extends FieldValues>({
  name,
  control,
  classes,
  ...rest
}: Props<T>) {
  const {
    field,
    fieldState: { isTouched, error },
  } = useController({ name, control });
  const { container, inputStyle, notValid, warning } = classes;
  return (
    <div className={container}>
      <textarea
        className={clsx(inputStyle, isTouched && error && notValid)}
        {...field}
        {...rest}
      />
      {error ? <span className={warning}>{error.message}</span> : null}
    </div>
  );
}

export default FormTextArea;
