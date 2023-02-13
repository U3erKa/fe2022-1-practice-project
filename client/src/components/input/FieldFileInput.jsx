import { useField } from 'formik';

const FieldFileInput = ({ classes, name, ...rest }) => {
  const { fileUploadContainer, labelClass, fileNameClass, fileInput } = classes;

  // eslint-disable-next-line no-unused-vars
  const [{ value, ...restField }, meta, helpers] = useField(name);
  const getFileName = () => {
    if (value) {
      return value.name;
    }
    return '';
  };

  const onChange = (e) => {
    const file = e.target.files[0];
    helpers.setValue(file, false);
  };

  return (
    <div className={fileUploadContainer}>
      <label htmlFor="fileInput" className={labelClass}>
        Choose file
      </label>
      <span id="fileNameContainer" className={fileNameClass}>
        {getFileName()}
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
