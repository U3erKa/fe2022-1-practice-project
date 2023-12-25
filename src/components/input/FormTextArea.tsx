import {
  type DetailedHTMLProps,
  type FC,
  type InputHTMLAttributes,
} from 'react';
import { type Control, useController } from 'react-hook-form';
import clsx from 'clsx';

export type Props = DetailedHTMLProps<
  InputHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
> & {
  name: string;
  control: Control<any>;
  classes: Partial<
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
      {error && <span className={warning}>{error.message}</span>}
    </div>
  );
};

export default FormTextArea;
