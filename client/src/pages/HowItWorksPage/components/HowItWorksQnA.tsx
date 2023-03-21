import { Link } from 'react-router-dom';
import { uniqueId } from 'lodash';
import { HOW_IT_WORKS_QNA } from 'constants/howItWorks';
import type { FC } from 'react';
import { Answer } from './Answer';

export const HowItWorksQnA: FC = () => {
  const links: JSX.Element[] = [];
  const answers: JSX.Element[] = [];

  HOW_IT_WORKS_QNA.forEach(({ id, title, questions }) => {
    links.push(
      <p key={id}>
        <Link to={`#${id}`} relative="path">
          {title}
        </Link>
      </p>,
    );

    answers.push(
      <section key={id}>
        <h2 id={id}>{title}</h2>
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
