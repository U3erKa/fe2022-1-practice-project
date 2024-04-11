import clsx from 'clsx/lite';
import Image from 'next/image';
import { useDispatch, useSelector } from 'hooks';
import { CatalogListContainer, CatalogListHeader } from 'components/catalog';
import { DialogList } from 'components/dialog';
import {
  BLOCKED_PREVIEW_CHAT_MODE,
  CATALOG_PREVIEW_CHAT_MODE,
  FAVORITE_PREVIEW_CHAT_MODE,
  NORMAL_PREVIEW_CHAT_MODE,
} from 'constants/general';
import { setPreviewChatMode } from 'store/slices/chatSlice';
import LogoIcon from 'assets/icons/logo.png';
import styles from './styles/ChatList.module.scss';

const DIALOG_BUTTONS = [
  { id: 0, name: 'Normal', mode: NORMAL_PREVIEW_CHAT_MODE },
  { id: 1, name: 'Favorite', mode: FAVORITE_PREVIEW_CHAT_MODE },
  { id: 2, name: 'Blocked', mode: BLOCKED_PREVIEW_CHAT_MODE },
  { id: 3, name: 'Catalog', mode: CATALOG_PREVIEW_CHAT_MODE },
] as const;

const ChatList = () => {
  const { chatMode, isShowChatsInCatalog, userId } = useSelector(
    ({ chatStore, userStore }) => {
      const { chatMode, isShowChatsInCatalog } = chatStore;
      const { data } = userStore;
      const { id: userId } = data ?? {};
      return { chatMode, isShowChatsInCatalog, userId };
    },
  );
  const dispatch = useDispatch();

  return (
    <div>
      {isShowChatsInCatalog ? (
        <CatalogListHeader />
      ) : (
        <>
          <div className={styles.chatHeader}>
            <Image alt="send Message" src={LogoIcon} />
          </div>
          <div className={styles.buttonsContainer}>
            {DIALOG_BUTTONS.map(({ id, name, mode }) => (
              <span
                key={id}
                className={clsx(
                  styles.button,
                  chatMode === mode && styles.activeButton,
                )}
                onClick={() => dispatch(setPreviewChatMode(mode))}
              >
                {name}
              </span>
            ))}
          </div>
        </>
      )}
      {chatMode === CATALOG_PREVIEW_CHAT_MODE ? (
        <CatalogListContainer />
      ) : (
        // @ts-expect-error
        <DialogList userId={userId!} />
      )}
    </div>
  );
};

export default ChatList;
