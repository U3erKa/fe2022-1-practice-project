import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getDialogMessages, clearMessageList } from 'store/slices/chatSlice';
import {
  BlockMessage,
  ChatHeader,
  ChatInput,
  MainDialog,
} from 'components/Chat';

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
