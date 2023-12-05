import clsx from 'clsx';
import { isEqual } from 'radash';
import type { FC, ReactNode } from 'react';
import type { AnswerProps } from 'types/general';
import styles from './styles/Answer.module.scss';

export type Props = {
  active: boolean;
  contents: string | AnswerProps | ReactNode;
};

const isAnswer = (contents: unknown): contents is AnswerProps => {
  if (!contents) return false;
  return isEqual(Object.keys(contents).sort(), ['description', 'list'].sort());
};

export const Answer: FC<Props> = ({ active, contents }) => {
  const containerStyles = clsx({
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
