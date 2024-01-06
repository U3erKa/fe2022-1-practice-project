import { type FC, type MouseEvent, useCallback } from 'react';
import { useDispatch } from 'hooks';
import { Catalog } from 'components/catalog';
import styles from 'components/dialog/styles/DialogList.module.scss';
import { changeShowModeCatalog, deleteCatalog } from 'store/slices/chatSlice';
import type { CatalogId } from 'types/_common';
import type { Catalog as _Catalog } from 'types/chat';

export type Props = {
  readonly catalogList: _Catalog[];
};

const CatalogList: FC<Props> = ({ catalogList }) => {
  const dispatch = useDispatch();

  const goToCatalog = useCallback(
    (event: MouseEvent<HTMLDivElement>, catalog: _Catalog) => {
      dispatch(changeShowModeCatalog(catalog));
      event.stopPropagation();
    },
    [dispatch],
  );

  const deleteCatalogMethod = useCallback(
    (event: MouseEvent<SVGSVGElement>, catalogId: CatalogId) => {
      dispatch(deleteCatalog({ catalogId }));
      event.stopPropagation();
    },
    [dispatch],
  );

  const getListCatalog = () => {
    if (!catalogList.length) {
      <span className={styles.notFound}>Not found</span>;
    }

    const elementList = catalogList.map((catalog) => (
      <Catalog
        catalog={catalog}
        deleteCatalog={deleteCatalogMethod}
        goToCatalog={goToCatalog}
        key={catalog._id}
      />
    ));

    return elementList;
  };

  return <div className={styles.previewContainer}>{getListCatalog()}</div>;
};

export default CatalogList;
