import { useEffect } from 'react';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'hooks';
import { changeChatShow, getPreviewChat } from 'store/slices/chatSlice';
import { chatController } from 'api/ws/socketController';
import { CatalogCreation } from 'components/catalog';
import { ChatError, ChatList } from 'components/chat';
import { Dialog } from 'components/dialog';
import styles from './styles/Chat.module.sass';

const Chat = () => {
  const {
    chatStore: { isExpanded, isShow, isShowCatalogCreation, error },
    userStore: {
      // @ts-expect-error
      data: { id: userId },
    },
  } = useSelector(({ chatStore, userStore }) => ({
    chatStore,
    userStore,
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    chatController.subscribeChat(userId);
    dispatch(getPreviewChat());

    return () => {
      chatController.unsubscribeChat(userId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={clsx(styles.chatContainer, {
        [styles.showChat]: isShow,
      })}
    >
      {error && <ChatError getData={() => dispatch(getPreviewChat())} />}
      {isShowCatalogCreation && <CatalogCreation />}
      {isExpanded ? <Dialog userId={userId} /> : <ChatList />}
      <div
        className={styles.toggleChat}
        onClick={() => dispatch(changeChatShow())}
      >
        {isShow ? 'Hide Chat' : 'Show Chat'}
      </div>
    </div>
  );
};

export default Chat;
