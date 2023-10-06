import { useDispatch, useSelector } from 'hooks';
import {
  changeChatBlock,
  changeChatFavorite,
  changeShowAddChatToCatalogMenu,
  goToExpandedDialog,
} from 'store/slices/chatSlice';
import { DialogBox } from 'components/dialog';
import { getDays } from 'utils/functions';
import {
  BLOCKED_PREVIEW_CHAT_MODE,
  CATALOG_PREVIEW_CHAT_MODE,
  FAVORITE_PREVIEW_CHAT_MODE,
} from 'constants/general';
import type { MessagePreview } from 'types/chat';
import type { UserId } from 'types/api/_common';
import styles from './styles/DialogList.module.sass';

const DialogList = ({ userId, removeChat }) => {
  const { chatMode, messagesPreview, isShowChatsInCatalog, currentCatalog } =
    useSelector((state) => state.chatStore);
  const dispatch = useDispatch();

  const changeFavorite = (data, event) => {
    dispatch(changeChatFavorite(data));
    event.stopPropagation();
  };

  const changeBlackList = (data, event) => {
    dispatch(changeChatBlock(data));
    event.stopPropagation();
  };

  const changeShowCatalogCreation = (event, chatId) => {
    dispatch(changeShowAddChatToCatalogMenu(chatId));
    event.stopPropagation();
  };

  const onlyChatsInCatalog = (chatPreview: MessagePreview, _userId: UserId) =>
    currentCatalog?.chats.includes(chatPreview._id);

  const onlyFavoriteDialogs = (chatPreview: MessagePreview, userId: UserId) =>
    chatPreview.favoriteList[chatPreview.participants.indexOf(userId)];

  const onlyBlockDialogs = (chatPreview: MessagePreview, userId: UserId) =>
    chatPreview.blackList[chatPreview.participants.indexOf(userId)];

  const getTimeStr = (time: number) => {
    const currentTime = Date.now();
    const days = getDays(currentTime) - getDays(time);
    const date = new Date(time);

    if (days <= 0) return `${date.getHours()}:${date.getMinutes()}`;
    if (days <= 7) return date.toDateString().substring(0, 3);
    if (days <= 365) return date.toDateString().substring(4, 10);
    return date.toDateString();
  };

  const renderPreview = (filterFunc?) => {
    const arrayList: JSX.Element[] = [];
    messagesPreview.forEach((chatPreview, index) => {
      const dialogNode = (
        <DialogBox
          interlocutor={chatPreview.interlocutor}
          chatPreview={chatPreview}
          userId={userId}
          key={index}
          getTimeStr={getTimeStr}
          changeFavorite={changeFavorite}
          changeBlackList={changeBlackList}
          chatMode={chatMode}
          catalogOperation={
            chatMode === CATALOG_PREVIEW_CHAT_MODE
              ? removeChat
              : changeShowCatalogCreation
          }
          goToExpandedDialog={(data) => dispatch(goToExpandedDialog(data))}
        />
      );
      if (!filterFunc || (filterFunc && filterFunc(chatPreview, userId))) {
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
