import { type FC } from 'react';
import InputMask from 'react-input-mask';
import { type FieldAttributes, useField } from 'formik';
import clsx from 'clsx';
import type { CardField } from 'types/api/offer';

export type Props = FieldAttributes<unknown> & {
  label: string;
  changeFocus: (name: CardField) => void;
  classes: Record<string, string>;
  isInputMask?: boolean;
} & (
    | { isInputMask?: false; mask?: undefined }
    | { isInputMask?: true; mask: string }
  );

const PayInput: FC<Props> = ({
  label,
  changeFocus,
  classes,
  isInputMask,
  mask,
  name,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [field, meta, helpers] = useField<CardField>(name);
  const { touched, error } = meta;

  if (field.name === 'sum') {
    return (
      <div className={classes.container}>
        <input
          {...field}
          placeholder={label}
          className={clsx(classes.input, {
            [classes.notValid]: touched && error,
          })}
        />
        {touched && error && (
          // @ts-expect-error
          <span className={classes.error}>{error.message}!</span>
        )}
      </div>
    );
  }
  if (isInputMask) {
    return (
      <div className={classes.container}>
        <InputMask
          mask={mask}
          maskChar={null}
          {...field}
          placeholder={label}
          className={clsx(classes.input, {
            [classes.notValid]: touched && error,
          })}
          onFocus={() => changeFocus(field.name as CardField)}
        />
        {touched && error && (
          // @ts-expect-error
          <span className={classes.error}>{error.message}!</span>
        )}
      </div>
    );
  }
  return (
    <div className={classes.container}>
      <input
        {...field}
        placeholder={label}
        className={clsx(classes.input, {
          [classes.notValid]: touched && error,
        })}
        onFocus={() => changeFocus(field.name as CardField)}
      />
      {touched && error && (
        // @ts-expect-error
        <span className={classes.error}>{error.message}!</span>
      )}
    </div>
  );
};

export default PayInput;
