import cx from 'classnames';
import { isEqual } from 'radash';
import type { FC, ReactNode } from 'react';
import type { AnswerProps } from 'types/general';
import styles from '../styles/Answer.module.sass';

export type Props = {
  active: boolean;
  contents: string | AnswerProps | ReactNode;
};

const isAnswer = (contents): contents is AnswerProps => {
  return isEqual(Object.keys(contents), ['description', 'list'].sort());
};

export const Answer: FC<Props> = ({ active, contents }) => {
  const containerStyles = cx({
    [styles.inactive]: !active,
    [styles.container]: true,
  });

  if (isAnswer(contents)) {
    const { description, list } = contents;
    return (
      <section className={containerStyles}>
        <p className={styles.text}>{description}</p>
        <ul className={styles.list}>
          {list.map((text, i) => (
            <li key={i}>
              <p className={styles.text}>{text}</p>
            </li>
          ))}
        </ul>
      </section>
    );
  }

  return (
    <section className={containerStyles}>
      <p className={styles.text}>{contents}</p>
    </section>
  );
};

export default Answer;
