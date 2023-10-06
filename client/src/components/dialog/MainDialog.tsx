import clsx from 'clsx';
import { getDays } from 'utils/functions';
import type { ReactNode } from 'react';
import styles from './styles/MainDialog.module.sass';

const MainDialog = ({ messages, userId, messagesEnd }) => {
  const messagesArray: ReactNode[] = [];
  let currentTime = Date.now();

  messages.forEach(({ createdAt, sender, body }, i) => {
    if (getDays(currentTime) !== getDays(createdAt)) {
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
        <div ref={messagesEnd} />
      </div>,
    );
  });
  return <div className={styles.messageList}>{messagesArray}</div>;
};

export default MainDialog;
