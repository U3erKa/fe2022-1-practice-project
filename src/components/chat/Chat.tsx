import clsx from 'clsx/lite';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'hooks';
import { chatController } from 'api/ws/socketController';
import { CatalogCreation } from 'components/catalog';
import { ChatError, ChatList } from 'components/chat';
import { Dialog } from 'components/dialog';
import { changeChatShow, getPreviewChat } from 'store/slices/chatSlice';
import styles from './styles/Chat.module.scss';

const Chat = () => {
  const { error, isExpanded, isShow, isShowCatalogCreation, userId } =
    useSelector(({ chatStore, userStore }) => {
      const { error, isExpanded, isShow, isShowCatalogCreation } = chatStore;
      const { data } = userStore;
      const { id: userId } = data!;
      return { error, isExpanded, isShow, isShowCatalogCreation, userId };
    });
  const dispatch = useDispatch();

  useEffect(() => {
    chatController.subscribe(userId);
    dispatch(getPreviewChat());

    return () => {
      chatController.unsubscribe(userId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getData = useCallback(() => dispatch(getPreviewChat()), [dispatch]);

  return (
    <div className={clsx(styles.chatContainer, isShow && styles.showChat)}>
      {error ? <ChatError getData={getData} /> : null}
      {isShowCatalogCreation ? <CatalogCreation /> : null}
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
