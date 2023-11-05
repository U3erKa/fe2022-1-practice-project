import { type FC, type MouseEvent } from 'react';
import { useDispatch, useSelector } from 'hooks';
import {
  changeChatBlock,
  changeChatFavorite,
  changeShowAddChatToCatalogMenu,
  goToExpandedDialog,
} from 'store/slices/chatSlice';
import { DialogBox } from 'components/dialog';
import {
  BLOCKED_PREVIEW_CHAT_MODE,
  CATALOG_PREVIEW_CHAT_MODE,
  FAVORITE_PREVIEW_CHAT_MODE,
} from 'constants/general';
import type { MessagePreview } from 'types/chat';
import type {
  ChangeChatBlockParams,
  ChangeChatFavoriteParams,
  GoToExtendedDialog,
} from 'types/api/chat';
import type { ChatId, UserId } from 'types/api/_common';
import styles from './styles/DialogList.module.scss';

export type Props = {
  userId: UserId;
  removeChat: (event: MouseEvent<SVGSVGElement>, chatId: ChatId) => void;
};

const DialogList: FC<Props> = ({ userId, removeChat }) => {
  const { chatMode, messagesPreview, isShowChatsInCatalog, currentCatalog } =
    useSelector((state) => state.chatStore);
  const dispatch = useDispatch();

  const changeFavorite = (
    data: ChangeChatFavoriteParams,
    event: MouseEvent<SVGSVGElement>,
  ) => {
    dispatch(changeChatFavorite(data));
    event.stopPropagation();
  };

  const changeBlackList = (
    data: ChangeChatBlockParams,
    event: MouseEvent<SVGSVGElement>,
  ) => {
    dispatch(changeChatBlock(data));
    event.stopPropagation();
  };

  const changeShowCatalogCreation = (
    event: MouseEvent<SVGSVGElement>,
    chatId: ChatId,
  ) => {
    dispatch(changeShowAddChatToCatalogMenu(chatId));
    event.stopPropagation();
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onlyChatsInCatalog = (chatPreview: MessagePreview, _userId: UserId) =>
    currentCatalog?.chats.includes(chatPreview._id);

  const onlyFavoriteDialogs = (chatPreview: MessagePreview, userId: UserId) =>
    chatPreview.favoriteList[chatPreview.participants.indexOf(userId)];

  const onlyBlockDialogs = (chatPreview: MessagePreview, userId: UserId) =>
    chatPreview.blackList[chatPreview.participants.indexOf(userId)];

  const renderPreview = (
    filterFunc?:
      | typeof onlyChatsInCatalog
      | typeof onlyFavoriteDialogs
      | typeof onlyBlockDialogs,
  ) => {
    const arrayList: JSX.Element[] = [];
    messagesPreview.forEach((chatPreview, index) => {
      if (!filterFunc || (filterFunc && filterFunc(chatPreview, userId))) {
        const dialogNode = (
          <DialogBox
            interlocutor={chatPreview.interlocutor}
            chatPreview={chatPreview}
            userId={userId}
            key={index}
            changeFavorite={changeFavorite}
            changeBlackList={changeBlackList}
            chatMode={chatMode}
            catalogOperation={
              chatMode === CATALOG_PREVIEW_CHAT_MODE
                ? removeChat
                : changeShowCatalogCreation
            }
            goToExpandedDialog={(data: GoToExtendedDialog) =>
              dispatch(goToExpandedDialog(data))
            }
          />
        );
        arrayList.push(dialogNode);
      }
    });

    return arrayList.length ? (
      arrayList
    ) : (
      <span className={styles.notFound}>Not found</span>
    );
  };

  const renderChatPreview = () => {
    if (isShowChatsInCatalog) {
      return renderPreview(onlyChatsInCatalog);
    }
    if (chatMode === FAVORITE_PREVIEW_CHAT_MODE)
      return renderPreview(onlyFavoriteDialogs);
    if (chatMode === BLOCKED_PREVIEW_CHAT_MODE)
      return renderPreview(onlyBlockDialogs);
    return renderPreview();
  };

  return <div className={styles.previewContainer}>{renderChatPreview()}</div>;
};

export default DialogList;
