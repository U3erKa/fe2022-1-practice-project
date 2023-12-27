import clsx from 'clsx';
import { type ChangeEventHandler, type FC } from 'react';
import {
  type Control,
  type UseFormRegister,
  useController,
} from 'react-hook-form';

export type Props = {
  readonly name: string;
  readonly control: Control<any>;
  readonly register: UseFormRegister<any>;
  readonly classes: Record<string, string>;
};

const imageId = 'imagePreview';
const fileInputId = 'fileInput';
const imageType = /image.*/;

const ImageUpload: FC<Props> = ({ name, control, register, classes }) => {
  const { field } = useController({ name, control });
  const { uploadContainer, inputContainer, imgStyle } = classes;

  const { onChange, ...inputregister } = register(name);
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const node = window.document.getElementById(imageId) as HTMLImageElement;
    const [file] = e.target.files!;

    if (file?.type.match(imageType)) {
      const reader = new FileReader();
      reader.onload = () => {
        node.src = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
    onChange(e);
  };

  return (
    <div className={uploadContainer}>
      <div className={inputContainer}>
        <span>Support only images (*.jpg, *.png, *.jpeg)</span>
        <input
          id={fileInputId}
          type="file"
          accept=".jpg, .png, .jpeg"
          onChange={handleChange}
          {...inputregister}
        />
        <label htmlFor={fileInputId}>Choose file</label>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        width={120}
        height={120}
        id={imageId}
        className={clsx({ [imgStyle!]: !!field.value })}
        alt="user"
      />
    </div>
  );
};

export default ImageUpload;
