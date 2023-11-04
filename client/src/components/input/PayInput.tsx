import {
  type DetailedHTMLProps,
  type FC,
  type InputHTMLAttributes,
} from 'react';
import { type Control, useController } from 'react-hook-form';
import InputMask, { type Props as ReactInputMaskProps } from 'react-input-mask';
import clsx from 'clsx';
import type { CardField } from 'types/api/offer';

export type Props = {
  name: string;
  control: Control<any>;
  changeFocus: (name: CardField) => void;
  classes: Record<string, string>;
  isInputMask?: boolean;
} & (
  | (DetailedHTMLProps<
      InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    > & { isInputMask?: false; mask?: undefined })
  | (ReactInputMaskProps & { isInputMask?: true; mask: string })
);

const PayInput: FC<Props> = ({
  changeFocus,
  classes,
  isInputMask,
  mask,
  name,
  control,
  ...rest
}) => {
  const {
    field,
    fieldState: { isTouched, error },
  } = useController({ name, control });

  if (isInputMask && field.name !== 'sum') {
    return (
      <div className={classes.container}>
        <InputMask
          mask={mask}
          maskChar={null}
          className={clsx(classes.input, {
            [classes.notValid]: isTouched && error,
          })}
          onFocus={() => changeFocus(field.name as CardField)}
          {...(field as any)}
          {...rest}
        />
        {isTouched && error && (
          <span className={classes.error}>{error.message}!</span>
        )}
      </div>
    );
  }

  return (
    <div className={classes.container}>
      <input
        className={clsx(classes.input, {
          [classes.notValid]: isTouched && error,
        })}
        onFocus={() => changeFocus(field.name as CardField)}
        {...field}
        {...rest}
      />
      {isTouched && error && (
        <span className={classes.error}>{error.message}!</span>
      )}
    </div>
  );
};

export default PayInput;
