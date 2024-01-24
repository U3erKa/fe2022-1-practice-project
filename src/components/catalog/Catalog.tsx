import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  type FC,
  type MouseEvent,
  type MouseEventHandler,
  useCallback,
} from 'react';
import type { GetCatalogsResponse } from 'api/rest/catalogController';
import type { CatalogId } from 'types/_common';
import styles from './styles/Catalog.module.scss';

export type Props = {
  readonly catalog: GetCatalogsResponse[number];
  readonly deleteCatalog: (
    event: MouseEvent<SVGSVGElement>,
    catalogId: CatalogId,
  ) => void;
  readonly goToCatalog: (
    event: MouseEvent<HTMLDivElement>,
    catalog: GetCatalogsResponse[number],
  ) => void;
};

const Catalog: FC<Props> = ({ catalog, deleteCatalog, goToCatalog }) => {
  const { catalogName, chats, _id } = catalog;

  const handleClick: MouseEventHandler<SVGSVGElement> = useCallback(
    (event) => {
      deleteCatalog(event, _id);
    },
    [_id, deleteCatalog],
  );

  return (
    <div
      className={styles.catalogContainer}
      onClick={(event) => {
        goToCatalog(event, catalog);
      }}
    >
      <span className={styles.catalogName}>{catalogName}</span>
      <div className={styles.infoContainer}>
        <span>Chats number: </span>
        <span className={styles.numbers}>{chats.length}</span>
        <FontAwesomeIcon icon={faTrashCan} onClick={handleClick} />
      </div>
    </div>
  );
};

export default Catalog;
