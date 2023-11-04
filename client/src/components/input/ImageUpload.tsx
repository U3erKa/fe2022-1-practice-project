import { type ChangeEventHandler, type FC } from 'react';
import clsx from 'clsx';
import {
  type Control,
  type UseFormRegister,
  useController,
} from 'react-hook-form';

export type Props = {
  name: string;
  control: Control<any>;
  register: UseFormRegister<any>;
  classes: Record<string, string>;
};

const ImageUpload: FC<Props> = ({ name, control, register, classes }) => {
  const { field } = useController({ name, control });
  const { uploadContainer, inputContainer, imgStyle } = classes;

  const { onChange, ...inputregister } = register(name);
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const node = window.document.getElementById(
      'imagePreview',
    ) as HTMLImageElement;
    const [file] = e.target.files!;
    const imageType = /image.*/;

    if (file?.type.match(imageType)) {
      const reader = new FileReader();
      reader.onload = () => {
        node.src = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
    onChange(e)
  };

  return (
    <div className={uploadContainer}>
      <div className={inputContainer}>
        <span>Support only images (*.jpg, *.png, *.jpeg)</span>
        <input
          id="fileInput"
          type="file"
          accept=".jpg, .png, .jpeg"
          onChange={handleChange}
          {...inputregister}
        />
        <label htmlFor="fileInput">Choose file</label>
      </div>
      <img
        id="imagePreview"
        className={clsx({ [imgStyle]: !!field.value })}
        alt="user"
      />
    </div>
  );
};

export default ImageUpload;
