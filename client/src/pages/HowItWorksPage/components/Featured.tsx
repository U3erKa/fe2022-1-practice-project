import { FEATURED } from 'constants/howItWorks';
import styles from '../styles/Featured.module.scss';
import type { FC } from 'react';

export const Featured: FC = () => {
  const featuredLinks = FEATURED.map(({ src, alt, href }) => (
    <p key={alt} className={styles.link}>
      <a href={href}>
        <img src={src} alt={alt} />
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
