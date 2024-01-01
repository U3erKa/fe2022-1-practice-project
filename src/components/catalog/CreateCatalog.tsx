import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'hooks';
import { FormInput } from 'components/input';
import { createCatalog } from 'store/slices/chatSlice';
import { CatalogSchema } from 'utils/schemas';
import type { Catalog } from 'types/chat';
import styles from './styles/CreateCatalog.module.scss';

const classes = {
  container: styles.inputContainer,
  input: styles.input,
  notValid: styles.notValid,
  warning: styles.fieldWarning,
};

const CreateCatalog = () => {
  const addChatId = useSelector(({ chatStore }) => chatStore.addChatId);
  const dispatch = useDispatch();

  const { handleSubmit, control } = useForm({
    defaultValues: { catalogName: '' },
    resolver: zodResolver(CatalogSchema),
  });

  const onSubmit = (values: Pick<Catalog, 'catalogName'>) => {
    dispatch(
      createCatalog({ catalogName: values.catalogName, chatId: addChatId }),
    );
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <FormInput
        classes={classes}
        control={control}
        name="catalogName"
        placeholder="name of catalog"
      />
      <button type="submit">Create Catalog</button>
    </form>
  );
};

export default CreateCatalog;
