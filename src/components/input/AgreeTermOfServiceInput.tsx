import type { DetailedHTMLProps, FC, InputHTMLAttributes } from 'react';
import { type Control, useController } from 'react-hook-form';
import { PAGE } from 'constants/general';

export type Props = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  readonly classes: Record<'container' | 'warning', string>;
  readonly control: Control<any>;
  readonly name: string;
};

const AgreeTermOfServiceInput: FC<Props> = function AgreeTermOfServiceInput({
  id,
  classes,
  name,
  control,
  ...rest
}) {
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
