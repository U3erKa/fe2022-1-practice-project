import cx from 'classnames';
import { isEqual, uniqueId } from 'lodash';
import styles from '../styles/Answer.module.sass';
import type { FC, ReactNode } from 'react';
import type { AnswerProps } from 'types/general';

export type Props = {
  active: boolean;
  contents: string | AnswerProps | ReactNode;
};

const isAnswer = (contents): contents is AnswerProps => {
  return isEqual(Object.keys(contents), ['description', 'list'].sort());
};

export const Answer: FC<Props> = ({ active, contents }) => {
  const containerStyles = cx({ [styles.inactive]: !active });

  if (isAnswer(contents)) {
    const { description, list } = contents;
    return (
      <section className={containerStyles}>
        <p>{description}</p>
        <ul>
          {list.map((text) => (
            <li key={uniqueId()}>
              <p>{text}</p>
            </li>
          ))}
        </ul>
      </section>
    );
  }

  return (
    <section className={containerStyles}>
      <p>{contents}</p>
    </section>
  );
};

export default Answer;
