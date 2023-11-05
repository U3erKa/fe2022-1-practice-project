import { Link } from 'react-router-dom';
import styles from '../styles/GetStarted.module.scss';
import type { FC } from 'react';
import { HOW_IT_WORKS_PATH } from 'constants/general';

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
        <Link className={styles.button} to={'/startContest'}>
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
