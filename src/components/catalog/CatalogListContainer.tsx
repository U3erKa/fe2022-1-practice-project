import { useDispatch, useSelector } from 'hooks';
import { type MouseEvent, useEffect } from 'react';
import { CatalogList } from 'components/catalog';
import { DialogList } from 'components/dialog';
import { getCatalogList, removeChatFromCatalog } from 'store/slices/chatSlice';
import type { ChatId } from 'types/api/_common';

const CatalogListContainer = () => {
  const {
    chatStore: { currentCatalog, catalogList, isShowChatsInCatalog },
    userStore: { data },
  } = useSelector(({ chatStore, userStore }) => ({ chatStore, userStore }));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCatalogList());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const removeChatFromCatalogMethod = (
    event: MouseEvent<SVGSVGElement>,
    chatId: ChatId,
  ) => {
    dispatch(removeChatFromCatalog({ chatId, catalogId: currentCatalog!._id }));
    event.stopPropagation();
  };

  const { id } = data;
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
