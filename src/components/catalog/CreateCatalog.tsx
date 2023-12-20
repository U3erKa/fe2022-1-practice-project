import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch, useSelector } from 'hooks';
import { useForm } from 'react-hook-form';
import { FormInput } from 'components/input';
import { createCatalog } from 'store/slices/chatSlice';
import { CatalogSchema } from 'utils/schemas';
import type { Catalog } from 'types/chat';
import styles from './styles/CreateCatalog.module.scss';

const classes = {
  container: styles.inputContainer,
  input: styles.input,
  warning: styles.fieldWarning,
  notValid: styles.notValid,
};

const CreateCatalog = () => {
  const { addChatId } = useSelector((state) => state.chatStore);
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
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <FormInput
        name="catalogName"
        control={control}
        placeholder="name of catalog"
        classes={classes}
      />
      <button type="submit">Create Catalog</button>
    </form>
  );
};

export default CreateCatalog;
