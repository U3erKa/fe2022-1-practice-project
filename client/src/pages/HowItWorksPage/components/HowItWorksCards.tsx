import { Link } from 'react-router-dom';
import { DUMMY_LINK } from 'constants/general';
import { HOW_IT_WORKS_CARDS } from 'constants/howItWorks';
import styles from '../styles/HowItWorksCards.module.sass';
import type { FC } from 'react';

export const HowItWorksCards: FC = () => {
  const cards = HOW_IT_WORKS_CARDS.map(
    ({ heading, text, src, href, linkText }) => (
      <section className={styles.card} key={src}>
        <img
          className={styles.icon}
          src={src}
          alt={`${heading.toLowerCase()} icon`}
        />
        <h3 className={styles.heading}>{heading}</h3>
        <p className={styles.text}>{text}</p>
        <Link className={styles.button} to={href ?? DUMMY_LINK}>
          {linkText ?? heading}
        </Link>
      </section>
    ),
  );

  return (
    <article className={styles.container}>
      <section className={styles.contentsContainer}>
        <h4 className={styles.subHeading}>Our Services</h4>
        <h2 className={styles.heading}>3 Ways To Use Squadhelp</h2>
        <p className={styles.text}>
          Squadhelp offers 3 ways to get you a perfect name for your business.
        </p>
      </section>
      <article className={styles.cardContainer}>{cards}</article>
    </article>
  );
};

export default HowItWorksCards;
