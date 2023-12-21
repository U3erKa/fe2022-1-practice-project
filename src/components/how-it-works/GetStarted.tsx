import Image from 'next/image';
import Link from 'next/link';
import type { FC } from 'react';
import { PAGE } from 'constants/general';
import GetStartedImage1 from 'assets/howItWorks/getStartedBG1.svg';
import GetStartedImage2 from 'assets/howItWorks/getStartedBG2.svg';
import styles from './styles/GetStarted.module.scss';

export const GetStarted: FC = () => {
  return (
    <article className={styles.container}>
      <figure className={styles.icon}>
        <Image src={GetStartedImage1} alt="get started icon" />
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
        <Image src={GetStartedImage2} alt="get started icon" />
      </figure>
    </article>
  );
};

export default GetStarted;
