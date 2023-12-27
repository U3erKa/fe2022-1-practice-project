import { type MouseEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'hooks';
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
    dispatch(removeChatFromCatalog({ catalogId: currentCatalog!._id, chatId }));
    event.stopPropagation();
  };

  const { id } = data;
  return (
    <>
      {isShowChatsInCatalog ? (
        <DialogList removeChat={removeChatFromCatalogMethod} userId={id} />
      ) : (
        <CatalogList catalogList={catalogList} />
      )}
    </>
  );
};

export default CatalogListContainer;
