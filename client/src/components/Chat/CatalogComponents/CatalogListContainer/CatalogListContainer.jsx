import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getCatalogList, removeChatFromCatalog } from 'store/slices/chatSlice';
import { CatalogList, DialogList } from 'components/Chat';

const CatalogListContainer = () => {
  const {
    chatStore: {
      messagesPreview,
      currentCatalog,
      catalogList,
      isShowChatsInCatalog,
    },
    userStore,
  } = useSelector(({ chatStore, userStore }) => ({ chatStore, userStore }));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCatalogList());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const removeChatFromCatalogMethod = (event, chatId) => {
    dispatch(removeChatFromCatalog({ chatId, catalogId: currentCatalog._id }));
    event.stopPropagation();
  };

  const getDialogsPreview = () => {
    const { chats } = currentCatalog;
    const dialogsInCatalog = [];
    for (let i = 0; i < messagesPreview.length; i++) {
      for (let j = 0; j < chats.length; j++) {
        if (chats[j] === messagesPreview[i]._id) {
          dialogsInCatalog.push(messagesPreview[i]);
        }
      }
    }
    return dialogsInCatalog;
  };

  const { id } = userStore.data;
  return (
    <>
      {isShowChatsInCatalog ? (
        <DialogList
          userId={id}
          preview={getDialogsPreview()}
          removeChat={removeChatFromCatalogMethod}
        />
      ) : (
        <CatalogList catalogList={catalogList} />
      )}
    </>
  );
};

export default CatalogListContainer;
