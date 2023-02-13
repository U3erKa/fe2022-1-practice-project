import { useDispatch } from 'react-redux';

import { changeShowModeCatalog, deleteCatalog } from 'store/slices/chatSlice';
import { Catalog } from 'components/Chat';

import styles from '../CatalogListContainer/CatalogListContainer.module.sass';

const CatalogList = ({ catalogList }) => {
  const dispatch = useDispatch();

  const goToCatalog = (event, catalog) => {
    dispatch(changeShowModeCatalog(catalog));
    event.stopPropagation();
  };

  const deleteCatalogMethod = (event, catalogId) => {
    dispatch(deleteCatalog({ catalogId }));
    event.stopPropagation();
  };

  const getListCatalog = () => {
    if (!catalogList.length) {
      <span className={styles.notFound}>Not found</span>;
    }

    const elementList = catalogList.map((catalog) => (
      <Catalog
        catalog={catalog}
        key={catalog._id}
        deleteCatalog={deleteCatalogMethod}
        goToCatalog={goToCatalog}
      />
    ));

    return elementList;
  };

  return <div className={styles.listContainer}>{getListCatalog()}</div>;
};

export default CatalogList;
