import { HOW_IT_WORKS_PATH } from 'constants/general';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import type { FC } from 'react';
import styles from './styles/HowItWorksIntro.module.scss';

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
          <FontAwesomeIcon icon={faPlay} />
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