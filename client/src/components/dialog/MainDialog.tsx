import clsx from 'clsx';
import { getDays } from 'utils/functions';
import type { FC, MutableRefObject, ReactNode } from 'react';
import type { Message } from 'types/api/chat';
import type { UserId } from 'types/api/_common';
import styles from './styles/MainDialog.module.sass';

export type Props = {
  messages: Message[];
  userId: UserId;
  messagesEnd: MutableRefObject<HTMLDivElement | undefined>;
};

const MainDialog: FC<Props> = ({ messages, userId, messagesEnd }) => {
  const messagesArray: ReactNode[] = [];
  let currentTime = Date.now();

  messages.forEach(({ createdAt, sender, body }, i) => {
    if (getDays(currentTime) !== getDays(Date.parse(createdAt))) {
      messagesArray.push(
        <div key={createdAt} className={styles.date}>
          {new Date(createdAt).toDateString()}
        </div>,
      );
      currentTime = new Date(createdAt).valueOf();
    }

    messagesArray.push(
      <div
        key={i}
        className={clsx(userId === sender ? styles.ownMessage : styles.message)}
      >
        <span>{body}</span>
        <span className={styles.messageTime}>
          {new Date(createdAt).toLocaleTimeString('uk')}
        </span>
        {/* @ts-expect-error */}
        <div ref={messagesEnd} />
      </div>,
    );
  });
  return <div className={styles.messageList}>{messagesArray}</div>;
};

export default MainDialog;
