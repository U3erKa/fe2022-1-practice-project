import classNames from 'classnames';

import { useDispatch, useSelector } from 'hooks';
import { setPreviewChatMode } from 'store/slices/chatSlice';

import { CatalogListContainer, CatalogListHeader } from 'components/catalog';
import { DialogList } from 'components/dialog';

import {
  CATALOG_PREVIEW_CHAT_MODE,
  STATIC_IMAGES_PATH,
} from 'constants/general';
import { dialogButtons } from 'constants/chat';

import styles from './styles/ChatList.module.sass';

const ChatList = () => {
  const {
    chatStore: { chatMode, isShowChatsInCatalog },
    userStore: {
      // @ts-ignore
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
      // @ts-ignore
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
        // @ts-expect-error
        <DialogList userId={userId} />
      )}
    </div>
  );
};

export default ChatList;
