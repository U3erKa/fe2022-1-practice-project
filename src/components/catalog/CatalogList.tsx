import { useDispatch } from 'hooks';
import { type FC, type MouseEvent } from 'react';
import { Catalog } from 'components/catalog';
import styles from 'components/dialog/styles/DialogList.module.scss';
import { changeShowModeCatalog, deleteCatalog } from 'store/slices/chatSlice';
import type { CatalogId } from 'types/api/_common';
import type { Catalog as _Catalog } from 'types/chat';

export type Props = {
  catalogList: _Catalog[];
};

const CatalogList: FC<Props> = ({ catalogList }) => {
  const dispatch = useDispatch();

  const goToCatalog = (
    event: MouseEvent<HTMLDivElement>,
    catalog: _Catalog,
  ) => {
    dispatch(changeShowModeCatalog(catalog));
    event.stopPropagation();
  };

  const deleteCatalogMethod = (
    event: MouseEvent<SVGSVGElement>,
    catalogId: CatalogId,
  ) => {
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

  return <div className={styles.previewContainer}>{getListCatalog()}</div>;
};

export default CatalogList;
