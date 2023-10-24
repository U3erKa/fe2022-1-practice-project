import { type ChangeEventHandler, type FC } from 'react';
import { type FieldAttributes, useField } from 'formik';

export type Props = FieldAttributes<unknown> & {
  classes: Record<string, string>;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const FieldFileInput: FC<Props> = ({ classes, name, ...rest }) => {
  const { fileUploadContainer, labelClass, fileNameClass, fileInput } = classes;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [{ value, ...restField }, meta, helpers] = useField(name);

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const [file] = e.target.files!;
    helpers.setValue(file, false);
  };

  return (
    <div className={fileUploadContainer}>
      <label htmlFor="fileInput" className={labelClass}>
        Choose file
      </label>
      <span id="fileNameContainer" className={fileNameClass}>
        {value?.name ?? ''}
      </span>
      <input
        {...restField}
        className={fileInput}
        onChange={onChange}
        id="fileInput"
        type="file"
      />
    </div>
  );
};

export default FieldFileInput;
