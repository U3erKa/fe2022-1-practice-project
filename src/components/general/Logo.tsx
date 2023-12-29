import Image, { type ImageProps } from 'next/image';
import Link from 'next/link';
import type { FC } from 'react';
import BlueLogoIcon from 'assets/icons/blue-logo.png';

export type Props = Partial<ImageProps> & {
  readonly href?: string;
};

const Logo: FC<Props> = ({ href = '/', ...props }) => (
  <Link href={href}>
    <Image alt="logo" src={BlueLogoIcon} {...props} />
  </Link>
);

export default Logo;
