import Image, { type ImageProps } from 'next/image';
import { ANONYM_IMAGE_NAME, PUBLIC_URL } from 'constants/general';
import AnonymIcon from 'assets/icons/anonym.png';

type Props = Partial<ImageProps> & Pick<ImageProps, 'src'>;

export default function UserImage({ src, ...props }: Props) {
  return (
    <Image
      src={src === `${PUBLIC_URL}${ANONYM_IMAGE_NAME}` ? AnonymIcon : src}
      width={40}
      height={40}
      alt="user"
      {...props}
    />
  );
}
