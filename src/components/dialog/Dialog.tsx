import { type FC, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'hooks';
import { ChatHeader, ChatInput } from 'components/chat';
import { BlockMessage, MainDialog } from 'components/dialog';
import { clearMessageList, getDialogMessages } from 'store/slices/chatSlice';
import type { UserId } from 'types/api/_common';

type Props = {
  readonly userId: UserId;
};

const Dialog: FC<Props> = ({ userId }) => {
  const { chatData, interlocutorId, messages } = useSelector(
    ({ chatStore }) => {
      const { chatData, interlocutor, messages } = chatStore;
      const { id: interlocutorId } = interlocutor ?? {};
      return { chatData, interlocutorId, messages };
    },
  );
  const dispatch = useDispatch();

  const messagesEnd = useRef<HTMLDivElement>();

  const scrollToBottom = () => {
    if (messagesEnd.current) {
      messagesEnd.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  });

  useEffect(() => {
    if (!interlocutorId) return;
    dispatch(getDialogMessages({ interlocutorId }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        messagesEnd={messagesEnd}
        userId={userId}
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
