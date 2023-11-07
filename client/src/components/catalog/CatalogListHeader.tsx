import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeftLong, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'hooks';
import {
  changeCatalogName,
  changeRenameCatalogMode,
  changeShowModeCatalog,
} from 'store/slices/chatSlice';
import { FormInput } from 'components/input';
import { CatalogSchema } from 'utils/validators/validationSchems';
import type { Catalog } from 'types/chat';
import styles from './styles/CatalogHeader.module.scss';

const CatalogListHeader = () => {
  const { isRenameCatalog, currentCatalog } = useSelector(
    ({ chatStore }) => chatStore,
  );
  const dispatch = useDispatch();
  const { _id, catalogName } = currentCatalog ?? ({} as Catalog);

  const { handleSubmit, control } = useForm({
    defaultValues: { catalogName },
    resolver: zodResolver(CatalogSchema),
  });

  const changeCatalogNameMethod = (values: Pick<Catalog, 'catalogName'>) => {
    dispatch(
      changeCatalogName({ catalogName: values.catalogName, catalogId: _id }),
    );
  };

  return (
    <div className={styles.headerContainer}>
      <FontAwesomeIcon
        icon={faLeftLong}
        onClick={() => dispatch(changeShowModeCatalog())}
      />
      {!isRenameCatalog ? (
        <div className={styles.infoContainer}>
          <span>{catalogName}</span>
          <FontAwesomeIcon
            icon={faPenToSquare}
            onClick={() => dispatch(changeRenameCatalogMode())}
          />
        </div>
      ) : (
        <div className={styles.changeContainer}>
          <form onSubmit={handleSubmit(changeCatalogNameMethod)}>
            <FormInput
              name="catalogName"
              control={control}
              classes={{
                container: styles.inputContainer,
                input: styles.input,
                warning: styles.fieldWarning,
                notValid: styles.notValid,
              }}
              placeholder="Catalog Name"
            />
            <button type="submit">Change</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default CatalogListHeader;
