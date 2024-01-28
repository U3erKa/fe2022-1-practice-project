import { forwardRef, type ReactNode } from 'react';
import type { GetChatResponse } from 'api/rest/chatController';
import { getDays } from 'utils/functions';
import type { UserId } from 'types/_common';
import styles from './styles/MainDialog.module.scss';

export type Props = {
  readonly messages: GetChatResponse['messages'];
  readonly userId: UserId;
};

const MainDialog = forwardRef<HTMLDivElement, Props>(function MainDialog(
  { messages, userId },
  ref,
) {
  const messagesArray: ReactNode[] = [];
  let currentTime = Date.now();

  for (let i = 0; i < messages.length; i++) {
    const { createdAt, sender, body } = messages[i]!;

    if (getDays(currentTime) !== getDays(Date.parse(createdAt))) {
      messagesArray.push(
        <div className={styles.date} key={createdAt}>
          {new Date(createdAt).toDateString()}
        </div>,
      );
      currentTime = new Date(createdAt).valueOf();
    }

    messagesArray.push(
      <div
        className={userId === sender ? styles.ownMessage : styles.message}
        key={i}
      >
        <span>{body}</span>
        <span className={styles.messageTime}>
          {new Date(createdAt).toLocaleTimeString('uk')}
        </span>
        <div ref={ref} />
      </div>,
    );
  }
  return <div className={styles.messageList}>{messagesArray}</div>;
});

export default MainDialog;
