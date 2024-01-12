import type { ComponentPropsWithoutRef, FC } from 'react';
import {
  type FieldValues,
  type UseControllerProps,
  useController,
} from 'react-hook-form';
import { PAGE } from 'constants/general';

export type Props<T extends FieldValues> = ComponentPropsWithoutRef<'input'> &
  Pick<UseControllerProps<T>, 'control' | 'name'> & {
    readonly classes: Record<'container' | 'warning', string>;
  };

const AgreeTermOfServiceInput = function AgreeTermOfServiceInput<
  T extends FieldValues,
>({ id, classes, name, control, ...rest }: Props<T>) {
  const {
    field,
    fieldState: { error, isTouched },
  } = useController({ name, control });

  return (
    <div>
      <div className={classes.container}>
        <input id={id} type="checkbox" {...field} {...rest} />
        <label htmlFor={id}>
          By clicking this checkbox, you agree to our{' '}
          <a href={PAGE.DUMMY_LINK} rel="noreferrer" target="_blank">
            Terms of Service.
          </a>
        </label>
      </div>
      {isTouched && error?.message ? (
        <span className={classes.warning}>{error.message}</span>
      ) : null}
    </div>
  );
};

export default AgreeTermOfServiceInput;
