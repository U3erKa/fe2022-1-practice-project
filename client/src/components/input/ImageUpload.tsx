import { type ChangeEventHandler, type FC } from 'react';
import { useField } from 'formik';
import clsx from 'clsx';

export type Props = {
  name: string;
  classes: Record<string, string>;
};

const ImageUpload: FC<Props> = ({ name, classes }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [{ value, ...restField }, meta, helpers] = useField(name);
  const { uploadContainer, inputContainer, imgStyle } = classes;
  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const node = window.document.getElementById(
      'imagePreview',
    ) as HTMLImageElement;
    const [file] = e.target.files!;
    const imageType = /image.*/;

    if (!file.type.match(imageType)) {
      e.target.value = '';
    } else {
      helpers.setValue(file, false);
      const reader = new FileReader();
      reader.onload = () => {
        node.src = reader.result as string;
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
        <label htmlFor="fileInput">Choose file</label>
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
