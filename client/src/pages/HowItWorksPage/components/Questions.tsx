import { useState, type FC } from 'react';
import { uniqueId } from 'lodash';
import cx from 'classnames';
import { Answer } from '..';
import styles from '../styles/Questions.module.sass';
import type { HOW_IT_WORKS_QNA } from 'constants/howItWorks';

export type Props = {
  questions: (typeof HOW_IT_WORKS_QNA)[0]['questions'];
};

export const Questions: FC<Props> = ({ questions }) => {
  const [activeQuestion, setActiveQuestion] = useState(0);
  return (
    <section className={styles.container}>
      {questions.map(([question, answer], i) => {
        const active = activeQuestion === i;
        const buttonStyles = cx({
          [styles.activeButton]: active,
          [styles.question]: true,
        });

        return (
          <section className={styles.questionContainer} key={uniqueId()}>
            <button
              className={buttonStyles}
              onClick={() => setActiveQuestion(active ? -1 : i)}
            >
              {question}
            </button>
            <Answer active={active} contents={answer} />
          </section>
        );
      })}
    </section>
  );
};
