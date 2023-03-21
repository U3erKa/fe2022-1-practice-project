import { Link } from 'react-router-dom';
import { isEqual, uniqueId } from 'lodash';
import { HOW_IT_WORKS_QNA } from 'constants/howItWorks';
import type { FC, ReactNode } from 'react';
import type { AnswerProps } from 'types/general';

export const Answer: FC<{
  contents: string | AnswerProps | ReactNode;
}> = ({ contents }) => {
  if (isEqual(Object.keys(contents as any), ['description', 'list'].sort())) {
    const { description, list } = contents as AnswerProps;
    return (
      <>
        <p>{description}</p>
        <ul>
          {list.map((text) => (
            <li key={uniqueId()}>
              <p>{text}</p>
            </li>
          ))}
        </ul>
      </>
    );
  }

  return <p>{contents as ReactNode}</p>;
};

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
