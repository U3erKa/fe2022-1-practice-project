import { Formik, Form } from 'formik';

import { useDispatch, useSelector } from 'hooks';
import {
  changeCatalogName,
  changeRenameCatalogMode,
  changeShowModeCatalog,
} from 'store/slices/chatSlice';

import { FormInput } from 'components/input';
import { CatalogSchema } from 'utils/validators/validationSchems';

import styles from './styles/CatalogHeader.module.sass';

const CatalogListHeader = () => {
  const {
    isRenameCatalog,
    currentCatalog: { _id, catalogName },
  } = useSelector((state) => state.chatStore);
  const dispatch = useDispatch();

  const changeCatalogNameMethod = (values) => {
    dispatch(
      changeCatalogName({ catalogName: values.catalogName, catalogId: _id }),
    );
  };

  return (
    <div className={styles.headerContainer}>
      <i
        className="fas fa-long-arrow-alt-left"
        onClick={() => dispatch(changeShowModeCatalog())}
      />
      {!isRenameCatalog ? (
        <div className={styles.infoContainer}>
          <span>{catalogName}</span>
          <i
            className="fas fa-edit"
            onClick={() => dispatch(changeRenameCatalogMode())}
          />
        </div>
      ) : (
        <div className={styles.changeContainer}>
          <Formik
            onSubmit={changeCatalogNameMethod}
            initialValues={{ catalogName }}
            validationSchema={CatalogSchema}
          >
            <Form>
              <FormInput
                name="catalogName"
                classes={{
                  container: styles.inputContainer,
                  input: styles.input,
                  warning: styles.fieldWarning,
                  notValid: styles.notValid,
                }}
                type="text"
                label="Catalog Name"
              />
              <button type="submit">Change</button>
            </Form>
          </Formik>
        </div>
      )}
    </div>
  );
};

export default CatalogListHeader;
