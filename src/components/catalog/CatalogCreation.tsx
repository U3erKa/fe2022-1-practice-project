import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx/lite';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'hooks';
import { AddToCatalog, CreateCatalog } from 'components/catalog';
import {
  ADD_CHAT_TO_OLD_CATALOG,
  CREATE_NEW_CATALOG_AND_ADD_CHAT,
} from 'constants/general';
import {
  changeShowAddChatToCatalogMenu,
  changeTypeOfChatAdding,
  getCatalogList,
} from 'store/slices/chatSlice';
import styles from './styles/CatalogCreation.module.scss';

const CatalogCreation = () => {
  const { catalogCreationMode, isFetching } = useSelector(({ chatStore }) => {
    const { catalogCreationMode, isFetching } = chatStore;
    return { catalogCreationMode, isFetching };
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCatalogList());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = useCallback(
    () => dispatch(changeShowAddChatToCatalogMenu(null)),
    [dispatch],
  );

  if (isFetching) {
    return null;
  }

  return (
    <div className={styles.catalogCreationContainer}>
      <FontAwesomeIcon icon={faCircleXmark} onClick={handleClick} />
      <div className={styles.buttonsContainer}>
        <span
          className={clsx(
            catalogCreationMode === ADD_CHAT_TO_OLD_CATALOG && styles.active,
          )}
          onClick={() =>
            dispatch(changeTypeOfChatAdding(ADD_CHAT_TO_OLD_CATALOG))
          }
        >
          Old
        </span>
        <span
          className={clsx(
            catalogCreationMode === CREATE_NEW_CATALOG_AND_ADD_CHAT &&
              styles.active,
          )}
          onClick={() =>
            dispatch(changeTypeOfChatAdding(CREATE_NEW_CATALOG_AND_ADD_CHAT))
          }
        >
          New
        </span>
      </div>
      {catalogCreationMode === CREATE_NEW_CATALOG_AND_ADD_CHAT ? (
        <CreateCatalog />
      ) : (
        <AddToCatalog />
      )}
    </div>
  );
};

export default CatalogCreation;
