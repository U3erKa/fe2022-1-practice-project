import Image from 'next/image';
import type { FC } from 'react';
import { HOW_CONTESTS_WORK } from 'constants/howItWorks';
import HowContestsWorkImage1 from 'assets/howItWorks/howContestsWork1.svg';
import HowContestsWorkImage2 from 'assets/howItWorks/howContestsWork2.svg';
import styles from './styles/HowContestsWork.module.scss';

export const HowContestsWork: FC = () => {
  const howContestsWork = HOW_CONTESTS_WORK.map((listEntry, i) => (
    <li className={styles.howToItem} key={i}>
      <p className={styles.text}>{listEntry}</p>
    </li>
  ));

  return (
    <article className={styles.container}>
      <section className={styles.headingContainer}>
        <figure className={styles.icon}>
          <Image alt="how contests work icon" src={HowContestsWorkImage1} />
        </figure>
        <h2 className={styles.heading}>How Do Naming Contests Work?</h2>
      </section>
      <section className={styles.listContainer}>
        <figure className={styles.listIcon}>
          <Image alt="how contests work icon" src={HowContestsWorkImage2} />
        </figure>
        <section className={styles.howToContainer}>
          <ol className={styles.howTo}>{howContestsWork}</ol>
        </section>
      </section>
    </article>
  );
};

export default HowContestsWork;
