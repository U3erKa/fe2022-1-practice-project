import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

import { changeChatShow, getPreviewChat } from 'store/slices/chatSlice';
import { chatController } from 'api/ws/socketController';

import { CatalogCreation, ChatError, Dialog, ChatList } from 'components/Chat';

import styles from './Chat.module.sass';

const Chat = () => {
  const {
    chatStore: { isExpanded, isShow, isShowCatalogCreation, error },
    userStore: {
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
      className={classNames(styles.chatContainer, {
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
