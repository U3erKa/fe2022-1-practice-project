import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';

import { addChatToCatalog } from 'store/slices/chatSlice';
import { SelectInput } from 'components/InputComponents';
import styles from './AddToCatalog.module.sass';

const AddToCatalog = () => {
  const { catalogList, addChatId } = useSelector((state) => state.chatStore);
  const dispatch = useDispatch();

  const catalogNames = catalogList.map((catalog) => catalog.catalogName);
  const catalogIds = catalogList.map((catalog) => catalog._id);

  const onSubmit = (values) => {
    dispatch(
      addChatToCatalog({ chatId: addChatId, catalogId: values.catalogId }),
    );
  };

  return (
    <>
      {catalogNames.length !== 0 ? (
        <Formik onSubmit={onSubmit} initialValues={{ catalogId: '' }}>
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
