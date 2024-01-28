import { useMask, type MaskProps } from '@react-input/mask';
import clsx from 'clsx/lite';
import type { ComponentPropsWithoutRef } from 'react';
import {
  useController,
  type FieldValues,
  type UseControllerProps,
} from 'react-hook-form';
import type { CardField } from 'types/offer';

export type Props<T extends FieldValues> = ComponentPropsWithoutRef<'input'> &
  Pick<UseControllerProps<T>, 'control' | 'name'> & {
    readonly changeFocus: (name: CardField) => void;
    readonly classes: Record<string, string>;
    readonly replacement?: MaskProps['replacement'];
  } & (Pick<MaskProps, 'mask' | 'replacement'> | { mask?: undefined });

function PayInput<T extends FieldValues>({
  changeFocus,
  classes,
  mask,
  replacement,
  name,
  control,
  ...rest
}: Props<T>) {
  const {
    field: { ref, value, ...field },
    fieldState: { isTouched, error },
  } = useController({ name, control });
  const inputRef = useMask({ mask, replacement });
  const isMaskable = !!mask && field.name !== 'sum';

  return (
    <div className={classes.container}>
      <input
        className={clsx(classes.input, isTouched && error && classes.notValid)}
        ref={isMaskable ? inputRef : ref}
        value={isMaskable ? undefined : value}
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
}

export default PayInput;
