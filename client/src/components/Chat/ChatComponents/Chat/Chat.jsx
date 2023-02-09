import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

import {
  changeChatShow,
  setPreviewChatMode,
  changeShowModeCatalog,
  clearChatError,
  getPreviewChat,
} from 'store/slices/chatSlice';
import { chatController } from 'api/ws/socketController';

import {
  CatalogCreation,
  CatalogListContainer,
  CatalogListHeader,
  ChatError,
  Dialog,
  DialogListContainer,
} from 'components/Chat';

import {
  BLOCKED_PREVIEW_CHAT_MODE,
  CATALOG_PREVIEW_CHAT_MODE,
  FAVORITE_PREVIEW_CHAT_MODE,
  NORMAL_PREVIEW_CHAT_MODE,
  STATIC_IMAGES_PATH,
} from 'constants/general';

import styles from './Chat.module.sass';

const Chat = () => {
  const { chatStore, userStore } = useSelector(({ chatStore, userStore }) => ({
    chatStore,
    userStore,
  }));
  const dispatch = useDispatch();

  const { isExpanded, isShow, isShowCatalogCreation, error } = chatStore;
  const { id } = userStore.data;

  useEffect(() => {
    chatController.subscribeChat(userStore.data.id);
    dispatch(getPreviewChat());

    return () => {
      chatController.unsubscribeChat(userStore.data.id);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderDialogList = () => {
    const { chatMode, isShowChatsInCatalog } = chatStore;
    const { id } = userStore.data;

    return (
      <div>
        {isShowChatsInCatalog ? (
          <CatalogListHeader />
        ) : (
          <>
            <div className={styles.chatHeader}>
              <img src={`${STATIC_IMAGES_PATH}logo.png`} alt="logo" />
            </div>
            <div className={styles.buttonsContainer}>
              <span
                onClick={() =>
                  dispatch(setPreviewChatMode(NORMAL_PREVIEW_CHAT_MODE))
                }
                className={classNames(styles.button, {
                  [styles.activeButton]: chatMode === NORMAL_PREVIEW_CHAT_MODE,
                })}
              >
                Normal
              </span>
              <span
                onClick={() =>
                  dispatch(setPreviewChatMode(FAVORITE_PREVIEW_CHAT_MODE))
                }
                className={classNames(styles.button, {
                  [styles.activeButton]:
                    chatMode === FAVORITE_PREVIEW_CHAT_MODE,
                })}
              >
                Favorite
              </span>
              <span
                onClick={() =>
                  dispatch(setPreviewChatMode(BLOCKED_PREVIEW_CHAT_MODE))
                }
                className={classNames(styles.button, {
                  [styles.activeButton]: chatMode === BLOCKED_PREVIEW_CHAT_MODE,
                })}
              >
                Blocked
              </span>
              <span
                onClick={() =>
                  dispatch(setPreviewChatMode(CATALOG_PREVIEW_CHAT_MODE))
                }
                className={classNames(styles.button, {
                  [styles.activeButton]: chatMode === CATALOG_PREVIEW_CHAT_MODE,
                })}
              >
                Catalog
              </span>
            </div>
          </>
        )}
        {chatMode === CATALOG_PREVIEW_CHAT_MODE ? (
          <CatalogListContainer />
        ) : (
          <DialogListContainer userId={id} />
        )}
      </div>
    );
  };

  return (
    <div
      className={classNames(styles.chatContainer, {
        [styles.showChat]: isShow,
      })}
    >
      {error && <ChatError getData={() => dispatch(getPreviewChat())} />}
      {isShowCatalogCreation && <CatalogCreation />}
      {isExpanded ? <Dialog userId={id} /> : renderDialogList()}
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
