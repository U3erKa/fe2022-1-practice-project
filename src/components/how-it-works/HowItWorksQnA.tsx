import type { FC, JSX } from 'react';
import { HOW_IT_WORKS_QNA } from 'constants/howItWorks';
import { Questions } from './Questions';
import styles from './styles/HowItWorksQnA.module.scss';

export const HowItWorksQnA: FC = () => {
  const links: JSX.Element[] = [];
  const answers: JSX.Element[] = [];

  for (const { id, title, questions } of HOW_IT_WORKS_QNA) {
    links.push(
      <p className={styles.link} key={id}>
        <a href={`#${id}`}>{title}</a>
      </p>,
    );

    answers.push(
      <section className={styles.answers} id={id} key={id}>
        <h2 className={styles.heading}>{title}</h2>
        <Questions questions={questions} />
      </section>,
    );
  }

  return (
    <article className={styles.container}>
      <section className={styles.linksContainer}>{links}</section>
      <article className={styles.answersContainer}>{answers}</article>
    </article>
  );
};

export default HowItWorksQnA;
