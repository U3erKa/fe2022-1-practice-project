import { useDispatch } from 'hooks';
import { changeShowModeCatalog, deleteCatalog } from 'store/slices/chatSlice';

import { Catalog } from 'components/catalog';

import styles from './styles/CatalogListContainer.module.sass';

const CatalogList = ({ catalogList }) => {
  const dispatch = useDispatch();

  const goToCatalog = (event, catalog) => {
    // @ts-ignore
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
