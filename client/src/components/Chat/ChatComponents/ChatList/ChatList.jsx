import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

import { setPreviewChatMode } from 'store/slices/chatSlice';
import {
  CatalogListContainer,
  CatalogListHeader,
  DialogListContainer,
} from 'components/Chat';

import {
  CATALOG_PREVIEW_CHAT_MODE,
  STATIC_IMAGES_PATH,
} from 'constants/general';
import { dialogButtons } from 'constants/chat';

import styles from './ChatList.module.sass';

const ChatList = () => {
  const {
    chatStore: { chatMode, isShowChatsInCatalog },
    userStore: {
      data: { id: userId },
    },
  } = useSelector(({ chatStore, userStore }) => ({
    chatStore,
    userStore,
  }));
  const dispatch = useDispatch();

  const dialogs = dialogButtons.map(({ id, name, mode }) => (
    <span
      key={id}
      onClick={() => dispatch(setPreviewChatMode(mode))}
      className={classNames(styles.button, {
        [styles.activeButton]: chatMode === mode,
      })}
    >
      {name}
    </span>
  ));

  return (
    <div>
      {isShowChatsInCatalog ? (
        <CatalogListHeader />
      ) : (
        <>
          <div className={styles.chatHeader}>
            <img src={`${STATIC_IMAGES_PATH}logo.png`} alt="logo" />
          </div>
          <div className={styles.buttonsContainer}>{dialogs}</div>
        </>
      )}
      {chatMode === CATALOG_PREVIEW_CHAT_MODE ? (
        <CatalogListContainer />
      ) : (
        <DialogListContainer userId={userId} />
      )}
    </div>
  );
};

export default ChatList;
