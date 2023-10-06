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

  const renderPreview = (filterFunc?) => {
    const arrayList: JSX.Element[] = [];
    messagesPreview.forEach((chatPreview, index) => {
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
