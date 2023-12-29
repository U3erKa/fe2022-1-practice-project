import { useSelector } from 'hooks';
import { Chat } from 'components/chat';

const ChatContainer = () => {
  const data = useSelector(({ userStore }) => userStore.data);
  return data ? <Chat /> : null;
};

export default ChatContainer;
