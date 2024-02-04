import { faLeftLong, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'hooks';
import { FormInput } from 'components/input';
import {
  changeCatalogName,
  changeRenameCatalogMode,
  changeShowModeCatalog,
} from 'store/slices/chatSlice';
import { CatalogSchema } from 'utils/schemas';
import type { Catalog } from 'types/chat';
import styles from './styles/CatalogHeader.module.scss';

const CatalogListHeader = () => {
  const { isRenameCatalog, currentCatalog } = useSelector(({ chatStore }) => {
    const { isRenameCatalog, currentCatalog } = chatStore;
    return { isRenameCatalog, currentCatalog };
  });
  const dispatch = useDispatch();
  const { _id, catalogName } = currentCatalog ?? ({} as Catalog);

  const { handleSubmit, control } = useForm({
    defaultValues: { catalogName },
    resolver: zodResolver(CatalogSchema),
  });

  const changeCatalogNameMethod = useCallback(
    (values: Pick<Catalog, 'catalogName'>) => {
      dispatch(
        changeCatalogName({ catalogId: _id, catalogName: values.catalogName }),
      );
    },
    [_id, dispatch],
  );

  const handleShowModeCatalogClick = useCallback(
    () => dispatch(changeShowModeCatalog()),
    [dispatch],
  );
  const handleCatalogRename = useCallback(
    () => dispatch(changeRenameCatalogMode()),
    [dispatch],
  );

  return (
    <div className={styles.headerContainer}>
      <FontAwesomeIcon icon={faLeftLong} onClick={handleShowModeCatalogClick} />
      {!isRenameCatalog ? (
        <div className={styles.infoContainer}>
          <span>{catalogName}</span>
          <FontAwesomeIcon icon={faPenToSquare} onClick={handleCatalogRename} />
        </div>
      ) : (
        <div className={styles.changeContainer}>
          <form onSubmit={handleSubmit(changeCatalogNameMethod)}>
            <FormInput
              control={control}
              name="catalogName"
              placeholder="Catalog Name"
              classes={{
                container: styles.inputContainer,
                input: styles.input,
                notValid: styles.notValid,
                warning: styles.fieldWarning,
              }}
            />
            <button type="submit">Change</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default CatalogListHeader;
