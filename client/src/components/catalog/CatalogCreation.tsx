import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

import {
  changeShowAddChatToCatalogMenu,
  changeTypeOfChatAdding,
  getCatalogList,
} from 'store/slices/chatSlice';

import { CreateCatalog, AddToCatalog } from 'components/catalog';

import {
  ADD_CHAT_TO_OLD_CATALOG,
  CREATE_NEW_CATALOG_AND_ADD_CHAT,
} from 'constants/general';

import styles from './styles/CatalogCreation.module.sass';

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
      <i
        className="far fa-times-circle"
        onClick={() => dispatch(changeShowAddChatToCatalogMenu())}
      />
      <div className={styles.buttonsContainer}>
        <span
          onClick={() =>
            dispatch(changeTypeOfChatAdding(ADD_CHAT_TO_OLD_CATALOG))
          }
          className={classNames({
            [styles.active]: catalogCreationMode === ADD_CHAT_TO_OLD_CATALOG,
          })}
        >
          Old
        </span>
        <span
          onClick={() =>
            dispatch(changeTypeOfChatAdding(CREATE_NEW_CATALOG_AND_ADD_CHAT))
          }
          className={classNames({
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
