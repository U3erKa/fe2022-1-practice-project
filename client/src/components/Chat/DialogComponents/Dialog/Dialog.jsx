import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import className from 'classnames';

import { getDialogMessages, clearMessageList } from 'store/slices/chatSlice';
import { ChatHeader, ChatInput } from 'components/Chat';
import styles from './Dialog.module.sass';

const MainDialog = ({ messages, userId, messagesEnd }) => {
  const messagesArray = [];
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

const Dialog = ({ userId }) => {
  const {
    chatData,
    interlocutor: { id: interlocutorId },
    messages,
  } = useSelector((state) => state.chatStore);
  const dispatch = useDispatch();

  /** @type {import('react').MutableRefObject<HTMLDivElement>} */
  const messagesEnd = useRef();

  const scrollToBottom = () => {
    if (messagesEnd.current) {
      messagesEnd.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  });

  useEffect(() => {
    dispatch(getDialogMessages({ interlocutorId }));
  }, [interlocutorId]);

  useEffect(() => {
    return () => {
      dispatch(clearMessageList());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <ChatHeader userId={userId} />
      <MainDialog
        messages={messages}
        userId={userId}
        messagesEnd={messagesEnd}
      />
      {chatData && chatData.blackList.includes(true) ? (
        <BlockMessage chatData={chatData} userId={userId} />
      ) : (
        <ChatInput />
      )}
    </>
  );
};

export default Dialog;
