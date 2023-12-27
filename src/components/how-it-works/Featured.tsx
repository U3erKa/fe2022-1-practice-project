import Image from 'next/image';
import type { FC } from 'react';
import { FEATURED } from 'constants/howItWorks';
import styles from './styles/Featured.module.scss';

export const Featured: FC = () => {
  const featuredLinks = FEATURED.map(({ src, alt, href }) => (
    <p className={styles.link} key={alt}>
      <a href={href}>
        <Image alt={alt} src={src} />
      </a>
    </p>
  ));

  return (
    <article className={styles.container}>
      <h2 className={styles.heading}>Featured In</h2>
      <section className={styles.linksContainer}>{featuredLinks}</section>
    </article>
  );
};

export default Featured;
