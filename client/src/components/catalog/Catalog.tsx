import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import styles from './styles/Catalog.module.sass';

const Catalog = (props) => {
  const { deleteCatalog, goToCatalog } = props;
  const { catalogName, chats, _id } = props.catalog;
  return (
    <div
      className={styles.catalogContainer}
      onClick={(event) => goToCatalog(event, props.catalog)}
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
