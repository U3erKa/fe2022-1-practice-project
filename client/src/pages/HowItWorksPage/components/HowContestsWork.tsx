import { uniqueId } from 'lodash';
import { HOW_IT_WORKS_PATH } from 'constants/general';
import { HOW_CONTESTS_WORK } from 'constants/howItWorks';
import styles from '../styles/HowContestsWork.module.sass';
import type { FC } from 'react';

export const HowContestsWork: FC = () => {
  const howContestsWork = HOW_CONTESTS_WORK.map((listEntry) => (
    <li className={styles.howToItem} key={uniqueId()}>
      <p className={styles.text}>{listEntry}</p>
    </li>
  ));

  return (
    <article className={styles.container}>
      <section className={styles.headingContainer}>
        <figure className={styles.icon}>
          <img src={`${HOW_IT_WORKS_PATH}howContestsWork1.svg`} alt="icon" />
        </figure>
        <h2 className={styles.heading}>How Do Naming Contests Work?</h2>
      </section>
      <section className={styles.listContainer}>
        <figure className={styles.listIcon}>
          <img
            src={`${HOW_IT_WORKS_PATH}howContestsWork2.svg`}
            alt="how contests work icon"
          />
        </figure>
        <section className={styles.howToContainer}>
          <ol className={styles.howTo}>{howContestsWork}</ol>
        </section>
      </section>
    </article>
  );
};

export default HowContestsWork;
