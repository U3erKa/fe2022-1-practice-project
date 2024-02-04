import { useCallback, useEffect, type MouseEvent } from 'react';
import { useDispatch, useSelector } from 'hooks';
import { CatalogList } from 'components/catalog';
import { DialogList } from 'components/dialog';
import { getCatalogList, removeChatFromCatalog } from 'store/slices/chatSlice';
import type { ChatId } from 'types/_common';

const CatalogListContainer = () => {
  const { catalogList, currentCatalog, data, isShowChatsInCatalog } =
    useSelector(({ chatStore, userStore }) => {
      const { currentCatalog, catalogList, isShowChatsInCatalog } = chatStore;
      const { data } = userStore;
      return { catalogList, currentCatalog, data, isShowChatsInCatalog };
    });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCatalogList());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const removeChatFromCatalogMethod = useCallback(
    (event: MouseEvent<SVGSVGElement>, chatId: ChatId) => {
      dispatch(
        removeChatFromCatalog({ catalogId: currentCatalog!._id, chatId }),
      );
      event.stopPropagation();
    },
    [currentCatalog, dispatch],
  );

  return isShowChatsInCatalog ? (
    <DialogList removeChat={removeChatFromCatalogMethod} userId={data!.id} />
  ) : (
    <CatalogList catalogList={catalogList} />
  );
};

export default CatalogListContainer;
