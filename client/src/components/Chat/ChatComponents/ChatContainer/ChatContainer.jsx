import { useSelector } from 'react-redux';

import { Chat } from 'components/Chat';

const ChatContainer = () => {
  const data = useSelector((state) => state.userStore.data);
  return <>{data ? <Chat /> : null}</>;
};

export default ChatContainer;
