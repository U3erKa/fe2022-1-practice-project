import Image from 'next/image';
import Link from 'next/link';
import type { FC } from 'react';
import { PAGE } from 'constants/general';
import { HOW_IT_WORKS_CARDS } from 'constants/howItWorks';
import styles from './styles/HowItWorksCards.module.scss';

export const HowItWorksCards: FC = () => {
  return (
    <article className={styles.container}>
      <section className={styles.contentsContainer}>
        <h4 className={styles.subHeading}>Our Services</h4>
        <h2 className={styles.heading}>3 Ways To Use Squadhelp</h2>
        <p className={styles.text}>
          Squadhelp offers 3 ways to get you a perfect name for your business.
        </p>
      </section>

      <article className={styles.cardContainer}>
        {HOW_IT_WORKS_CARDS.map(({ heading, text, src, href, linkText }) => (
          <section className={styles.card} key={src}>
            <Image
              alt={`${heading.toLowerCase()} icon`}
              className={styles.icon}
              src={src}
            />
            <h3 className={`${styles.heading} ${styles.smallHeading}`}>
              {heading}
            </h3>
            <p className={styles.text}>{text}</p>
            <Link className={styles.button} href={href ?? PAGE.DUMMY_LINK}>
              {linkText ?? heading}
            </Link>
          </section>
        ))}
      </article>
    </article>
  );
};

export default HowItWorksCards;
