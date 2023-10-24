import { type FC, type ImgHTMLAttributes } from 'react';
import { Link } from 'react-router-dom';
import { Picture } from 'components/general';
import { STATIC_IMAGES_PATH } from 'constants/general';

export type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, 'srcSet'> & {
  to?: string;
  srcSet?: string[];
};

const Logo: FC<Props> = ({ to = '/', ...props }) => (
  <Link to={to}>
    <Picture
      srcSet={[
        `${STATIC_IMAGES_PATH}blue-logo.avif`,
        `${STATIC_IMAGES_PATH}blue-logo.webp`,
      ]}
      src={`${STATIC_IMAGES_PATH}blue-logo.png`}
      alt="logo"
      {...props}
    />
  </Link>
);

export default Logo;
