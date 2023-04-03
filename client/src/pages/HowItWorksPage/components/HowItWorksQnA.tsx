import { uniqueId } from 'lodash';
import { HOW_IT_WORKS_QNA } from 'constants/howItWorks';
import { Answer } from '..';
import styles from '../styles/HowItWorksQnA.module.sass';
import type { FC } from 'react';

export const HowItWorksQnA: FC = () => {
  const links: JSX.Element[] = [];
  const answers: JSX.Element[] = [];

  HOW_IT_WORKS_QNA.forEach(({ id, title, questions }) => {
    links.push(
      <p className={styles.link} key={id}>
        <a href={`#${id}`}>{title}</a>
      </p>,
    );

    answers.push(
      <section id={id} key={id}>
        <h2 className={styles.heading}>{title}</h2>
        {questions.map(([question, answer]) => {
          return (
            <div key={uniqueId()}>
              <button>{question}</button>
              <Answer contents={answer} />
            </div>
          );
        })}
      </section>,
    );
  });

  return (
    <article className={styles.container}>
      <section className={styles.linksContainer}>{links}</section>
      <section className={styles.answersContainer}>{answers}</section>
    </article>
  );
};

export default HowItWorksQnA;
