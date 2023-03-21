import { isEqual, uniqueId } from 'lodash';
import type { FC, ReactNode } from 'react';
import type { AnswerProps } from 'types/general';

export type Props = {
  contents: string | AnswerProps | ReactNode;
};

const isAnswer = (contents): contents is AnswerProps => {
  return isEqual(Object.keys(contents), ['description', 'list'].sort());
};

export const Answer: FC<Props> = ({ contents }) => {
  if (isAnswer(contents)) {
    const { description, list } = contents;
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

  return <p>{contents}</p>;
};

export default Answer;
