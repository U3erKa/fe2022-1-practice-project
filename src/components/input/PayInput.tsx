import { type MaskProps, useMask } from '@react-input/mask';
import clsx from 'clsx';
import {
  type DetailedHTMLProps,
  type FC,
  type InputHTMLAttributes,
} from 'react';
import { type Control, useController } from 'react-hook-form';
import type { CardField } from 'types/api/offer';

export type Props = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  name: string;
  control: Control<any>;
  changeFocus: (name: CardField) => void;
  classes: Record<string, string>;
  replacement?: MaskProps['replacement'];
} & ({ mask?: undefined } | Pick<MaskProps, 'mask' | 'replacement'>);

const PayInput: FC<Props> = ({
  changeFocus,
  classes,
  mask,
  replacement,
  name,
  control,
  ...rest
}) => {
  const {
    field: { ref, value, ...field },
    fieldState: { isTouched, error },
  } = useController({ name, control });
  const inputRef = useMask({ mask, replacement });
  const isMaskable = !!mask && field.name !== 'sum';

  return (
    <div className={classes.container}>
      <input
        className={clsx(classes.input, {
          [classes.notValid]: isTouched && error,
        })}
        onFocus={() => changeFocus(field.name as CardField)}
        value={isMaskable ? undefined : value}
        ref={isMaskable ? inputRef : ref}
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
