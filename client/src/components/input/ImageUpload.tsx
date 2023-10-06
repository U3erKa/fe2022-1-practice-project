import React from 'react';
import clsx from 'clsx';
import { useField } from 'formik';

const ImageUpload = (props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [{ value, ...restField }, meta, helpers] = useField(props.name);
  const { uploadContainer, inputContainer, imgStyle } = props.classes;
  const onChange = (e) => {
    const node = window.document.getElementById(
      'imagePreview',
    ) as HTMLImageElement;
    const file = e.target.files[0];
    const imageType = /image.*/;

    if (!file.type.match(imageType)) {
      e.target.value = '';
    } else {
      helpers.setValue(file, false);
      const reader = new FileReader();
      reader.onload = () => {
        // @ts-expect-error
        node.src = reader.result;
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className={uploadContainer}>
      <div className={inputContainer}>
        <span>Support only images (*.jpg, *.png, *.jpeg)</span>
        <input
          {...restField}
          id="fileInput"
          type="file"
          accept=".jpg, .png, .jpeg"
          onChange={onChange}
        />
        <label htmlFor="fileInput">Chose file</label>
      </div>
      <img
        id="imagePreview"
        className={clsx({ [imgStyle]: !!value })}
        alt="user"
      />
    </div>
  );
};

export default ImageUpload;
