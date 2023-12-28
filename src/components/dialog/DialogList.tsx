import { type FC, type MouseEvent, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'hooks';
import { DialogBox } from 'components/dialog';
import {
  BLOCKED_PREVIEW_CHAT_MODE,
  CATALOG_PREVIEW_CHAT_MODE,
  FAVORITE_PREVIEW_CHAT_MODE,
} from 'constants/general';
import {
  changeChatBlock,
  changeChatFavorite,
  changeShowAddChatToCatalogMenu,
  goToExpandedDialog,
} from 'store/slices/chatSlice';
import { uniqueId } from 'utils/functions';
import type { ChatId, UserId } from 'types/api/_common';
import type {
  ChangeChatBlockParams,
  ChangeChatFavoriteParams,
  GoToExtendedDialog,
} from 'types/api/chat';
import type { MessagePreview } from 'types/chat';
import styles from './styles/DialogList.module.scss';

export type Props = {
  readonly userId: UserId;
  readonly removeChat: (
    event: MouseEvent<SVGSVGElement>,
    chatId: ChatId,
  ) => void;
};

const onlyFavoriteDialogs = (chatPreview: MessagePreview, userId: UserId) =>
  chatPreview.favoriteList[chatPreview.participants.indexOf(userId)];

const onlyBlockDialogs = (chatPreview: MessagePreview, userId: UserId) =>
  chatPreview.blackList[chatPreview.participants.indexOf(userId)];

const DialogList: FC<Props> = ({ userId, removeChat }) => {
  const { chatMode, messagesPreview, isShowChatsInCatalog, currentCatalog } =
    // prettier-ignore
    useSelector(({ chatStore }) => {
      const { chatMode, currentCatalog, isShowChatsInCatalog, messagesPreview }
        = chatStore;
      return { chatMode, currentCatalog, isShowChatsInCatalog, messagesPreview };
    });
  const dispatch = useDispatch();

  const changeFavorite = useCallback(
    (data: ChangeChatFavoriteParams, event: MouseEvent<SVGSVGElement>) => {
      dispatch(changeChatFavorite(data));
      event.stopPropagation();
    },
    [dispatch],
  );

  const changeBlackList = useCallback(
    (data: ChangeChatBlockParams, event: MouseEvent<SVGSVGElement>) => {
      dispatch(changeChatBlock(data));
      event.stopPropagation();
    },
    [dispatch],
  );

  const changeShowCatalogCreation = useCallback(
    (event: MouseEvent<SVGSVGElement>, chatId: ChatId) => {
      dispatch(changeShowAddChatToCatalogMenu(chatId));
      event.stopPropagation();
    },
    [dispatch],
  );

  const onlyChatsInCatalog = useCallback(
    (chatPreview: MessagePreview, _userId: UserId) =>
      currentCatalog?.chats.includes(chatPreview._id),
    [currentCatalog?.chats],
  );

  const handleGoToExpandedDialog = useCallback(
    (data: GoToExtendedDialog) => dispatch(goToExpandedDialog(data)),
    [dispatch],
  );

  const renderPreview = useCallback(
    (
      filterFunc?:
        | typeof onlyChatsInCatalog
        | typeof onlyFavoriteDialogs
        | typeof onlyBlockDialogs,
    ) => {
      const arrayList: JSX.Element[] = [];
      for (const chatPreview of messagesPreview) {
        if (!filterFunc || filterFunc(chatPreview, userId)) {
          const dialogNode = (
            <DialogBox
              changeBlackList={changeBlackList}
              changeFavorite={changeFavorite}
              chatMode={chatMode}
              chatPreview={chatPreview}
              goToExpandedDialog={handleGoToExpandedDialog}
              interlocutor={chatPreview.interlocutor}
              key={uniqueId()}
              userId={userId}
              catalogOperation={
                chatMode === CATALOG_PREVIEW_CHAT_MODE
                  ? removeChat
                  : changeShowCatalogCreation
              }
            />
          );
          arrayList.push(dialogNode);
        }
      }

      return arrayList.length ? (
        arrayList
      ) : (
        <span className={styles.notFound}>Not found</span>
      );
    },
    [
      changeBlackList,
      changeFavorite,
      changeShowCatalogCreation,
      chatMode,
      handleGoToExpandedDialog,
      messagesPreview,
      removeChat,
      userId,
    ],
  );

  const chatPreview = useMemo(() => {
    if (isShowChatsInCatalog) {
      return renderPreview(onlyChatsInCatalog);
    }
    if (chatMode === FAVORITE_PREVIEW_CHAT_MODE)
      return renderPreview(onlyFavoriteDialogs);
    if (chatMode === BLOCKED_PREVIEW_CHAT_MODE)
      return renderPreview(onlyBlockDialogs);
    return renderPreview();
  }, [chatMode, isShowChatsInCatalog, onlyChatsInCatalog, renderPreview]);

  return <div className={styles.previewContainer}>{chatPreview}</div>;
};

export default DialogList;
