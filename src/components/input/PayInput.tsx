import { type MaskProps, useMask } from '@react-input/mask';
import clsx from 'clsx';
import type { DetailedHTMLProps, FC, InputHTMLAttributes } from 'react';
import { type Control, useController } from 'react-hook-form';
import type { CardField } from 'types/api/offer';

export type Props = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  readonly name: string;
  readonly control: Control<any>;
  readonly changeFocus: (name: CardField) => void;
  readonly classes: Record<string, string>;
  readonly replacement?: MaskProps['replacement'];
} & (Pick<MaskProps, 'mask' | 'replacement'> | { mask?: undefined });

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
        ref={isMaskable ? inputRef : ref}
        value={isMaskable ? undefined : value}
        className={clsx(classes.input, {
          [classes.notValid]: isTouched && error,
        })}
        onFocus={() => {
          changeFocus(field.name as CardField);
        }}
        {...field}
        {...rest}
      />
      {isTouched && error ? (
        <span className={classes.error}>{error.message}!</span>
      ) : null}
    </div>
  );
};

export default PayInput;
