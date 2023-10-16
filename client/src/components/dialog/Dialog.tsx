import { useEffect, useRef, type FC } from 'react';
import { useDispatch, useSelector } from 'hooks';
import { getDialogMessages, clearMessageList } from 'store/slices/chatSlice';
import { ChatHeader, ChatInput } from 'components/chat';
import { BlockMessage, MainDialog } from 'components/dialog';
import type { UserId } from 'types/api/_common';

type Props = {
  userId: UserId;
};

const Dialog: FC<Props> = ({ userId }) => {
  const {
    chatData,
    // @ts-expect-error
    interlocutor: { id: interlocutorId },
    messages,
  } = useSelector((state) => state.chatStore);
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
