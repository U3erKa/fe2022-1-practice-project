import { useEffect } from 'react';

import { useDispatch, useSelector } from 'hooks';
import { getCatalogList, removeChatFromCatalog } from 'store/slices/chatSlice';

import { CatalogList } from 'components/catalog';
import { DialogList } from 'components/dialog';

const CatalogListContainer = () => {
  const {
    chatStore: { currentCatalog, catalogList, isShowChatsInCatalog },
    userStore,
  } = useSelector(({ chatStore, userStore }) => ({ chatStore, userStore }));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCatalogList());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const removeChatFromCatalogMethod = (event, chatId) => {
    dispatch(removeChatFromCatalog({ chatId, catalogId: currentCatalog!._id }));
    event.stopPropagation();
  };

  const { id } = userStore.data!;
  return (
    <>
      {isShowChatsInCatalog ? (
        <DialogList userId={id} removeChat={removeChatFromCatalogMethod} />
      ) : (
        <CatalogList catalogList={catalogList} />
      )}
    </>
  );
};

export default CatalogListContainer;
