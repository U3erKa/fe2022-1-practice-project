import type { FC } from 'react';
import type { UserId } from 'types/_common';
import type { ChatData } from 'types/chat';
import styles from './styles/BlockMessage.module.scss';

export type Props = {
  readonly chatData: ChatData;
  readonly userId: UserId;
};

const BlockMessage: FC<Props> = ({ chatData, userId }) => {
  const { blackList, participants } = chatData;
  const userIndex = participants.indexOf(userId);
  let message: string | undefined;

  if (chatData) {
    if (blackList[userIndex]) {
      message = 'You block him';
    } else if (blackList.includes(true)) {
      message = 'He block you';
    }
  }
  if (!message) {
    return null;
  }

  return <span className={styles.messageBlock}>{message}</span>;
};

export default BlockMessage;
