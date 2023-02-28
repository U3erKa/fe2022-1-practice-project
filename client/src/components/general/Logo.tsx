import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { STATIC_IMAGES_PATH } from 'constants/general';
import { FC } from 'react';

export type Props = {
  to?: string;
  src?: string;
  alt?: string;
  className?: string;
};

const Logo: FC<Props> = ({ to, ...props }) => (
  <Link to={to!}>
    {/* eslint-disable-next-line jsx-a11y/alt-text */}
    <img {...props} />
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
  src: `${STATIC_IMAGES_PATH}blue-logo.png`,
  alt: 'logo',
};

export default Logo;
