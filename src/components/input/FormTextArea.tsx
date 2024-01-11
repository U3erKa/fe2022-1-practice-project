import clsx from 'clsx/lite';
import type { ComponentPropsWithoutRef, FC } from 'react';
import { type Control, useController } from 'react-hook-form';

export type Props = ComponentPropsWithoutRef<'textarea'> & {
  readonly name: string;
  readonly control: Control<any>;
  readonly classes: Partial<
    Record<'container' | 'inputStyle' | 'notValid' | 'warning', string>
  >;
};

const FormTextArea: FC<Props> = ({ name, control, classes, ...rest }) => {
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
};

export default FormTextArea;
