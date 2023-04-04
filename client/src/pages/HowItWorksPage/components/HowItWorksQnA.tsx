import { useState } from 'react';
import { uniqueId } from 'lodash';
import { HOW_IT_WORKS_QNA } from 'constants/howItWorks';
import { Answer } from '..';
import styles from '../styles/HowItWorksQnA.module.sass';
import type { FC } from 'react';

type QuestionProps = {
  questions: (typeof HOW_IT_WORKS_QNA)[0]['questions'];
};

const Questions: FC<QuestionProps> = ({ questions }) => {
  const [activeQuestion, setActiveQuestion] = useState(0);
  return (
    <>
      {questions.map(([question, answer], i) => {
        return (
          <section key={uniqueId()}>
            <button onClick={() => setActiveQuestion(i)}>{question}</button>
            <Answer active={activeQuestion === i} contents={answer} />
          </section>
        );
      })}
    </>
  );
};

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
        <Questions questions={questions} />
      </section>,
    );
  });

  return (
    <article className={styles.container}>
      <section className={styles.linksContainer}>{links}</section>
      <article className={styles.answersContainer}>{answers}</article>
    </article>
  );
};

export default HowItWorksQnA;
