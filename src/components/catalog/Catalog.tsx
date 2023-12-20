import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { type FC, type MouseEvent } from 'react';
import type { CatalogId } from 'types/api/_common';
import type { Catalog as _Catalog } from 'types/chat';
import styles from './styles/Catalog.module.scss';

export type Props = {
  catalog: _Catalog;
  deleteCatalog: (
    event: MouseEvent<SVGSVGElement>,
    catalogId: CatalogId,
  ) => void;
  goToCatalog: (event: MouseEvent<HTMLDivElement>, catalog: _Catalog) => void;
};

const Catalog: FC<Props> = ({ catalog, deleteCatalog, goToCatalog }) => {
  const { catalogName, chats, _id } = catalog;
  return (
    <div
      className={styles.catalogContainer}
      onClick={(event) => goToCatalog(event, catalog)}
    >
      <span className={styles.catalogName}>{catalogName}</span>
      <div className={styles.infoContainer}>
        <span>Chats number: </span>
        <span className={styles.numbers}>{chats.length}</span>
        <FontAwesomeIcon
          icon={faTrashCan}
          onClick={(event) => deleteCatalog(event, _id)}
        />
      </div>
    </div>
  );
};

export default Catalog;
