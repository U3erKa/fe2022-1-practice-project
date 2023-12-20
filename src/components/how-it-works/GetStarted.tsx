import Link from 'next/link';
import type { FC } from 'react';
import { HOW_IT_WORKS_PATH, PAGE } from 'constants/general';
import styles from './styles/GetStarted.module.scss';

export const GetStarted: FC = () => {
  return (
    <article className={styles.container}>
      <figure className={styles.icon}>
        <img
          src={`${HOW_IT_WORKS_PATH}getStartedBG1.svg`}
          alt="get started icon"
        />
      </figure>
      <section className={styles.headingContainer}>
        <h2 className={styles.getStartedHeading}>Ready to get started?</h2>
        <p className={styles.getStartedText}>
          Fill out your contest brief and begin receiving custom name
          suggestions within minutes.
        </p>
        <Link className={styles.button} href={PAGE.START_CONTEST}>
          Start A Contest
        </Link>
      </section>
      <figure className={styles.icon}>
        <img
          src={`${HOW_IT_WORKS_PATH}getStartedBG2.svg`}
          alt="get started icon"
        />
      </figure>
    </article>
  );
};

export default GetStarted;
