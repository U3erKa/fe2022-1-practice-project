import { isEqual, uniqueId } from 'lodash';
import type { FC, ReactNode } from 'react';
import type { AnswerProps } from 'types/general';

export type Props = {
  contents: string | AnswerProps | ReactNode;
};

export const Answer: FC<Props> = ({ contents }) => {
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

export default Answer;
