import { type FC } from 'react';
import { Form, Formik, type FormikHelpers } from 'formik';
import { type InferType } from 'yup';
import { useDispatch, useSelector } from 'hooks';
import { clearUserError } from 'store/slices/userSlice';
import { Error, Spinner } from 'components/general';
import { FormInput, ImageUpload } from 'components/input';
import { UpdateUserSchema } from 'utils/validators/validationSchems';
import styles from './styles/UpdateUserInfoForm.module.sass';
import { uniqueId } from 'utils/functions';

export type Props = {
  onSubmit: (
    values: InferType<typeof UpdateUserSchema>,
    formikHelpers: FormikHelpers<InferType<typeof UpdateUserSchema>>,
  ) => void;
  submitting?: boolean;
};

const INPUT_CONTAINERS = [
  { id: uniqueId(), label: 'First Name', name: 'firstName' },
  { id: uniqueId(), label: 'Last Name', name: 'lastName' },
  { id: uniqueId(), label: 'Display Name', name: 'displayName' },
] as const;

const inputClasses = {
  container: styles.inputContainer,
  input: styles.input,
  warning: styles.error,
  notValid: styles.notValid,
};

const imageUploadClasses = {
  uploadContainer: styles.imageUploadContainer,
  inputContainer: styles.uploadInputContainer,
  imgStyle: styles.imgStyle,
};

const UpdateUserInfoForm: FC<Props> = ({ onSubmit, submitting }) => {
  const { data: user, error } = useSelector((state) => state.userStore);
  const dispatch = useDispatch();

  if (!user) return <Spinner />;

  const inputContainers = INPUT_CONTAINERS.map(({ id, label, name }) => (
    <div key={id} className={styles.container}>
      <span className={styles.label}>{label}</span>
      <FormInput type="text" name={name} label={label} classes={inputClasses} />
    </div>
  ));

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
        {inputContainers}
        <ImageUpload name="file" classes={imageUploadClasses} />
        <button type="submit" disabled={submitting}>
          Submit
        </button>
      </Form>
    </Formik>
  );
};

export default UpdateUserInfoForm;
