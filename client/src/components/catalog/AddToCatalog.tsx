import { Formik, Form } from 'formik';
import { useDispatch, useSelector } from 'hooks';
import { addChatToCatalog } from 'store/slices/chatSlice';
import { SelectInput } from 'components/input';
import type { CatalogId } from 'types/api/_common';
import styles from './styles/AddToCatalog.module.sass';

const AddToCatalog = () => {
  const { catalogList, addChatId } = useSelector((state) => state.chatStore);
  const dispatch = useDispatch();

  const catalogNames = catalogList.map((catalog) => catalog.catalogName);
  const catalogIds = catalogList.map((catalog) => catalog._id);

  const onSubmit = (values: { catalogId: CatalogId }) => {
    dispatch(
      addChatToCatalog({ chatId: addChatId!, catalogId: values.catalogId }),
    );
  };

  return (
    <>
      {catalogNames.length !== 0 ? (
        <Formik onSubmit={onSubmit} initialValues={{ catalogId: '' as any }}>
          <Form className={styles.form}>
            <SelectInput
              name="catalogId"
              header="name of catalog"
              classes={{
                inputContainer: styles.selectInputContainer,
                inputHeader: styles.selectHeader,
                selectInput: styles.select,
              }}
              optionsArray={catalogNames}
              valueArray={catalogIds}
            />
            <button type="submit">Add</button>
          </Form>
        </Formik>
      ) : (
        <div className={styles.notFound}>
          You have not created any directories.
        </div>
      )}
    </>
  );
};

export default AddToCatalog;
