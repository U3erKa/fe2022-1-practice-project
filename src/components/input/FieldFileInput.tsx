import {
  type DetailedHTMLProps,
  type FC,
  type InputHTMLAttributes,
} from 'react';
import {
  type Control,
  type UseFormRegister,
  useController,
} from 'react-hook-form';

export type Props = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  name: string;
  control: Control<any>;
  register: UseFormRegister<any>;
  classes: Record<string, string>;
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
      <label htmlFor={id ?? 'fileInput'} className={labelClass}>
        Choose file
      </label>
      <span id="fileNameContainer" className={fileNameClass}>
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
