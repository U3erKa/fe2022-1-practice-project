import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { uniqueId } from 'lodash';
import { GET_STARTED_IMAGES } from 'constants/howItWorks';
import styles from '../styles/GetStarted.module.sass';
import type { FC } from 'react';
import { HOW_IT_WORKS_PATH } from 'constants/general';

export const GetStarted: FC = () => {
  const images = GET_STARTED_IMAGES.map(({ src, alt, caption }) => {
    const captionElement = caption.map((entry) => (
      <Fragment key={uniqueId('caption')}>{entry}</Fragment>
    ));

    return (
      <figure key={uniqueId('img')}>
        <img src={src} alt={alt} />
        <figcaption>{captionElement}</figcaption>
      </figure>
    );
  });

  return (
    <>
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
      <article className={styles.container}>{images}</article>
    </>
  );
};

export default GetStarted;
