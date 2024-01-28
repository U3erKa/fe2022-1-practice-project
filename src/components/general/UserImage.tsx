import Image, { type ImageProps } from 'next/image';
import { ANONYM_IMAGE_NAME, PUBLIC_URL } from 'constants/general';
import AnonymIcon from 'assets/icons/anonym.png';

type Props = Partial<ImageProps> & Pick<ImageProps, 'src'>;

const UserImage = ({ src, ...props }: Props) => (
  <Image
    alt="user"
    height={40}
    src={src === `${PUBLIC_URL}${ANONYM_IMAGE_NAME}` ? AnonymIcon : src}
    width={40}
    {...props}
  />
);

export default UserImage;
