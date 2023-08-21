import { HOW_IT_WORKS_PATH } from 'constants/general';
import styles from '../styles/HowItWorksIntro.module.sass';
import type { FC } from 'react';

export const HowItWorksIntro: FC = () => {
  return (
    <article className={styles.container}>
      <section className={styles.contents}>
        <h4 className={styles.subHeading}>World's #1 Naming Platform</h4>
        <h1 className={styles.mainHeading}>How Does Squadhelp Work?</h1>
        <p className={styles.text}>
          Squadhelp helps you come up with a great name for your business by
          combining the power of crowdsourcing with sophisticated technology and
          Agency-level validation services.
        </p>
        <a
          className={styles.button}
          href="https://vimeo.com/368584367"
          target="_blank"
          rel="noreferrer"
        >
          <i className="fas fa-play"></i>
          Play video
        </a>
      </section>
      <figure className={styles.imageContainer}>
        <img src={`${HOW_IT_WORKS_PATH}main.svg`} alt="main icon" />
      </figure>
    </article>
  );
};

export default HowItWorksIntro;