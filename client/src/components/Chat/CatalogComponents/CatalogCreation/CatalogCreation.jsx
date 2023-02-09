import { useEffect } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import {
  changeShowAddChatToCatalogMenu,
  changeTypeOfChatAdding,
  getCatalogList,
} from 'store/slices/chatSlice';

import { CreateCatalog, AddToCatalog } from 'components/Chat';

import {
  ADD_CHAT_TO_OLD_CATALOG,
  CREATE_NEW_CATALOG_AND_ADD_CHAT,
} from 'constants/general';

import styles from './CatalogCreation.module.sass';

const CatalogCreation = (props) => {
  const {
    changeTypeOfChatAdding,
    catalogCreationMode,
    changeShowAddChatToCatalogMenu,
    isFetching,
    getCatalogList,
  } = props;

  useEffect(() => {
    getCatalogList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {!isFetching && (
        <div className={styles.catalogCreationContainer}>
          <i
            className="far fa-times-circle"
            onClick={() => changeShowAddChatToCatalogMenu()}
          />
          <div className={styles.buttonsContainer}>
            <span
              onClick={() => changeTypeOfChatAdding(ADD_CHAT_TO_OLD_CATALOG)}
              className={classNames({
                [styles.active]:
                  catalogCreationMode === ADD_CHAT_TO_OLD_CATALOG,
              })}
            >
              Old
            </span>
            <span
              onClick={() =>
                changeTypeOfChatAdding(CREATE_NEW_CATALOG_AND_ADD_CHAT)
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
      )}
    </>
  );
};

const mapStateToProps = (state) => state.chatStore;

const mapDispatchToProps = (dispatch) => ({
  changeTypeOfChatAdding: (data) => dispatch(changeTypeOfChatAdding(data)),
  changeShowAddChatToCatalogMenu: () =>
    dispatch(changeShowAddChatToCatalogMenu()),
  getCatalogList: () => dispatch(getCatalogList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CatalogCreation);
