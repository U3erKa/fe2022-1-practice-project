import { useSelector } from 'hooks';

import { Chat } from 'components/chat';

const ChatContainer = () => {
  const data = useSelector((state) => state.userStore.data);
  return <>{data ? <Chat /> : null}</>;
};

export default ChatContainer;