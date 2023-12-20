import type { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image, { type ImageProps } from 'next/image';
import { ANONYM_IMAGE_NAME } from 'constants/general';
import AnonymIcon from 'assets/icons/anonym.png';

type Props = Partial<ImageProps> & {
  avatar: string;
  src: string | StaticImport;
};

export default function UserImage({ avatar, src, ...props }: Props) {
  return (
    <Image
      src={avatar === ANONYM_IMAGE_NAME ? AnonymIcon : src}
      width={40}
      height={40}
      alt="user"
      {...props}
    />
  );
}
