import clsx from 'clsx';
import Image from 'next/image';
import { useDispatch, useSelector } from 'hooks';
import { CatalogListContainer, CatalogListHeader } from 'components/catalog';
import { DialogList } from 'components/dialog';
import { dialogButtons } from 'constants/chat';
import { CATALOG_PREVIEW_CHAT_MODE } from 'constants/general';
import { setPreviewChatMode } from 'store/slices/chatSlice';
import LogoIcon from 'assets/icons/logo.png';
import styles from './styles/ChatList.module.scss';

const ChatList = () => {
  const {
    chatStore: { chatMode, isShowChatsInCatalog },
    userStore: {
      // @ts-expect-error
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
      className={clsx(styles.button, {
        [styles.activeButton]: chatMode === mode,
      })}
      onClick={() => dispatch(setPreviewChatMode(mode))}
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
            <Image alt="send Message" src={LogoIcon} />
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
