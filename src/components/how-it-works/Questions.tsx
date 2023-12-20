'use client';

import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import { useState } from 'react';
import type { FC } from 'react';
import type { HOW_IT_WORKS_QNA } from 'constants/howItWorks';
import { Answer } from '.';
import styles from './styles/Questions.module.scss';

export type Props = {
  questions: (typeof HOW_IT_WORKS_QNA)[0]['questions'];
};

export const Questions: FC<Props> = ({ questions }) => {
  const [activeQuestion, setActiveQuestion] = useState(0);
  return (
    <section>
      {questions.map(({ id, question, answer }, i) => {
        const active = activeQuestion === i;
        const iconStyles = clsx({
          [styles.activeIcon]: active,
          [styles.arrowIcon]: true,
        });

        return (
          <section className={styles.questionContainer} key={id}>
            <button
              className={styles.question}
              onClick={() => setActiveQuestion(active ? -1 : i)}
            >
              {question}
              <FontAwesomeIcon icon={faArrowRight} className={iconStyles} />
            </button>
            <Answer active={active} contents={answer} />
          </section>
        );
      })}
    </section>
  );
};
