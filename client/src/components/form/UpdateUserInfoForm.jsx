import { Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';

import { clearUserError } from 'store/slices/userSlice';
import { Error } from 'components/general';
import { ImageUpload, FormInput } from 'components/input';

import { UpdateUserSchema } from 'utils/validators/validationSchems';
import styles from './styles/UpdateUserInfoForm.module.sass';

const UpdateUserInfoForm = ({ onSubmit, submitting }) => {
  const { data: user, error } = useSelector((state) => state.userStore);
  const dispatch = useDispatch();

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={{
        firstName: user.firstName,
        lastName: user.lastName,
        displayName: user.displayName,
      }}
      validationSchema={UpdateUserSchema}
    >
      <Form className={styles.updateContainer}>
        {error && (
          <Error
            data={error.data}
            status={error.status}
            clearError={() => dispatch(clearUserError())}
          />
        )}
        <div className={styles.container}>
          <span className={styles.label}>First Name</span>
          <FormInput
            name="firstName"
            type="text"
            label="First Name"
            classes={{
              container: styles.inputContainer,
              input: styles.input,
              warning: styles.error,
              notValid: styles.notValid,
            }}
          />
        </div>
        <div className={styles.container}>
          <span className={styles.label}>Last Name</span>
          <FormInput
            name="lastName"
            type="text"
            label="LastName"
            classes={{
              container: styles.inputContainer,
              input: styles.input,
              warning: styles.error,
              notValid: styles.notValid,
            }}
          />
        </div>
        <div className={styles.container}>
          <span className={styles.label}>Display Name</span>
          <FormInput
            name="displayName"
            type="text"
            label="Display Name"
            classes={{
              container: styles.inputContainer,
              input: styles.input,
              warning: styles.error,
              notValid: styles.notValid,
            }}
          />
        </div>
        <ImageUpload
          name="file"
          classes={{
            uploadContainer: styles.imageUploadContainer,
            inputContainer: styles.uploadInputContainer,
            imgStyle: styles.imgStyle,
          }}
        />
        <button type="submit" disabled={submitting}>
          Submit
        </button>
      </Form>
    </Formik>
  );
};

export default UpdateUserInfoForm;
