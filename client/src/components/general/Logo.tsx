import { type FC } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Picture } from 'components/general';
import { STATIC_IMAGES_PATH } from 'constants/general';

export type Props = {
  to?: string;
  srcSet?: string[];
  src?: string;
  alt?: string;
  className?: string;
};

const Logo: FC<Props> = ({ to, ...props }) => (
  <Link to={to!}>
    <Picture {...props} />
  </Link>
);

Logo.propTypes = {
  className: PropTypes.string,
  to: PropTypes.string,
  src: PropTypes.string,
  alt: PropTypes.string,
};

Logo.defaultProps = {
  to: '/',
  srcSet: [
    `${STATIC_IMAGES_PATH}blue-logo.avif`,
    `${STATIC_IMAGES_PATH}blue-logo.webp`,
  ],
  src: `${STATIC_IMAGES_PATH}blue-logo.png`,
  alt: 'logo',
};

export default Logo;
