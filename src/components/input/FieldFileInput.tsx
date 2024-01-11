import type { ComponentProps, FC } from 'react';
import {
  type Control,
  type UseFormRegister,
  useController,
} from 'react-hook-form';

export type Props = ComponentProps<'input'> & {
  readonly name: string;
  readonly control: Control<any>;
  readonly register: UseFormRegister<any>;
  readonly classes: Record<string, string>;
};

const FieldFileInput: FC<Props> = ({
  name,
  control,
  register,
  classes,
  id,
  ...rest
}) => {
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
