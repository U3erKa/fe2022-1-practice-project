import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'hooks';
import { useEffect } from 'react';
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
  const { catalogCreationMode, isFetching } = useSelector(
    (state) => state.chatStore,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCatalogList());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isFetching) {
    return null;
  }

  return (
    <div className={styles.catalogCreationContainer}>
      <FontAwesomeIcon
        icon={faCircleXmark}
        onClick={() => dispatch(changeShowAddChatToCatalogMenu(null))}
      />
      <div className={styles.buttonsContainer}>
        <span
          onClick={() =>
            dispatch(changeTypeOfChatAdding(ADD_CHAT_TO_OLD_CATALOG))
          }
          className={clsx({
            [styles.active]: catalogCreationMode === ADD_CHAT_TO_OLD_CATALOG,
          })}
        >
          Old
        </span>
        <span
          onClick={() =>
            dispatch(changeTypeOfChatAdding(CREATE_NEW_CATALOG_AND_ADD_CHAT))
          }
          className={clsx({
            [styles.active]:
              catalogCreationMode === CREATE_NEW_CATALOG_AND_ADD_CHAT,
          })}
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
