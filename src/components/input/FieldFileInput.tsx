import type { ComponentPropsWithoutRef } from 'react';
import {
  type FieldValues,
  type UseControllerProps,
  type UseFormReturn,
  useController,
} from 'react-hook-form';

export type Props<T extends FieldValues> = ComponentPropsWithoutRef<'input'> &
  Pick<UseControllerProps<T>, 'control' | 'name'> &
  Pick<UseFormReturn<T>, 'register'> & {
    readonly classes: Record<string, string>;
  };

const FieldFileInput = function <T extends FieldValues>({
  name,
  control,
  register,
  classes,
  id,
  ...rest
}: Props<T>) {
  const { field } = useController({ name, control });
  const { fileUploadContainer, labelClass, fileNameClass, fileInput } = classes;

  return (
    <div className={fileUploadContainer}>
      <label className={labelClass} htmlFor={id ?? 'fileInput'}>
        Choose file
      </label>
      <span className={fileNameClass} id="fileNameContainer">
        {field.value?.[0]?.name}
      </span>
      <input
        className={fileInput}
        id={id ?? 'fileInput'}
        type="file"
        {...register(name)}
        {...rest}
      />
    </div>
  );
};

export default FieldFileInput;
