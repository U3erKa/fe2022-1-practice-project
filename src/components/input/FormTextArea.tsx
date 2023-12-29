import clsx from 'clsx';
import type { DetailedHTMLProps, FC, InputHTMLAttributes } from 'react';
import { type Control, useController } from 'react-hook-form';

export type Props = DetailedHTMLProps<
  InputHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
> & {
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
        className={clsx(inputStyle, {
          [notValid!]: isTouched && error,
        })}
        {...field}
        {...rest}
      />
      {error ? <span className={warning}>{error.message}</span> : null}
    </div>
  );
};

export default FormTextArea;
