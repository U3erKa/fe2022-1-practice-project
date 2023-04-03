import { uniqueId } from 'lodash';
import { HOW_IT_WORKS_QNA } from 'constants/howItWorks';
import { Answer } from '..';
import type { FC } from 'react';

export const HowItWorksQnA: FC = () => {
  const links: JSX.Element[] = [];
  const answers: JSX.Element[] = [];

  HOW_IT_WORKS_QNA.forEach(({ id, title, questions }) => {
    links.push(
      <p key={id}>
        <a href={`#${id}`}>{title}</a>
      </p>,
    );

    answers.push(
      <section id={id} key={id}>
        <h2>{title}</h2>
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
    <article>
      <section>{links}</section>
      {answers}
    </article>
  );
};

export default HowItWorksQnA;
