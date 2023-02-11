import styles from './BlockMessage.module.sass';

const BlockMessage = ({ chatData, userId }) => {
  const { blackList, participants } = chatData;
  const userIndex = participants.indexOf(userId);
  let message;

  if (chatData && blackList[userIndex]) {
    message = 'You block him';
  } else if (chatData && blackList.includes(true)) {
    message = 'He block you';
  }

  return <span className={styles.messageBlock}>{message}</span>;
};

export default BlockMessage;
