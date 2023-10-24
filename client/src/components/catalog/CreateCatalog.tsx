import { Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'hooks';
import { createCatalog } from 'store/slices/chatSlice';
import { FormInput } from 'components/input';
import { CatalogSchema } from 'utils/validators/validationSchems';
import type { Catalog } from 'types/chat';
import styles from './styles/CreateCatalog.module.sass';

const classes = {
  container: styles.inputContainer,
  input: styles.input,
  warning: styles.fieldWarning,
  notValid: styles.notValid,
};

const CreateCatalog = () => {
  const { addChatId } = useSelector((state) => state.chatStore);
  const dispatch = useDispatch();

  const click = (values: Pick<Catalog, 'catalogName'>) => {
    dispatch(
      createCatalog({ catalogName: values.catalogName, chatId: addChatId }),
    );
  };
  return (
    <Formik
      onSubmit={click}
      initialValues={{ catalogName: '' }}
      validationSchema={CatalogSchema}
    >
      <Form className={styles.form}>
        <FormInput
          name="catalogName"
          type="text"
          label="name of catalog"
          classes={classes}
        />
        <button type="submit">Create Catalog</button>
      </Form>
    </Formik>
  );
};

export default CreateCatalog;
