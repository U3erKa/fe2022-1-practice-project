import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'hooks';
import { SelectInput } from 'components/input';
import { addChatToCatalog } from 'store/slices/chatSlice';
import type { CatalogId } from 'types/_common';
import styles from './styles/AddToCatalog.module.scss';

const classes = {
  inputContainer: styles.selectInputContainer,
  inputHeader: styles.selectHeader,
  selectInput: styles.select,
};

const AddToCatalog = () => {
  const { addChatId, catalogList } = useSelector(({ chatStore }) => {
    const { addChatId, catalogList } = chatStore;
    return { addChatId, catalogList };
  });
  const dispatch = useDispatch();

  const catalogNames: string[] = [];
  const catalogIds: CatalogId[] = [];
  for (const { catalogName, _id } of catalogList) {
    catalogNames.push(catalogName);
    catalogIds.push(_id);
  }

  const { handleSubmit, control } = useForm({
    defaultValues: { catalogId: catalogIds[0] },
  });

  const onSubmit = ({ catalogId }: { catalogId: CatalogId }) => {
    dispatch(addChatToCatalog({ catalogId, chatId: addChatId! }));
  };

  return catalogNames.length !== 0 ? (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <SelectInput
        classes={classes}
        control={control}
        header="name of catalog"
        name="catalogId"
        optionsArray={catalogNames}
        valueArray={catalogIds}
      />
      <button type="submit">Add</button>
    </form>
  ) : (
    <div className={styles.notFound}>You have not created any directories.</div>
  );
};

export default AddToCatalog;
