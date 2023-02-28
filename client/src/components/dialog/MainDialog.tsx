import moment from 'moment';
import className from 'classnames';

import styles from './styles/MainDialog.module.sass';

const MainDialog = ({ messages, userId, messagesEnd }) => {
  const messagesArray: unknown[] = [];
  let currentTime = moment();

  messages.forEach(({ createdAt, sender, body }, i) => {
    if (!currentTime.isSame(createdAt, 'date')) {
      messagesArray.push(
        <div key={createdAt} className={styles.date}>
          {moment(createdAt).format('MMMM DD, YYYY')}
        </div>,
      );
      currentTime = moment(createdAt);
    }

    messagesArray.push(
      <div
        key={i}
        className={className(
          userId === sender ? styles.ownMessage : styles.message,
        )}
      >
        <span>{body}</span>
        <span className={styles.messageTime}>
          {moment(createdAt).format('HH:mm')}
        </span>
        <div ref={messagesEnd} />
      </div>,
    );
  });
  return <div className={styles.messageList}>{messagesArray}</div>;
};

export default MainDialog;
