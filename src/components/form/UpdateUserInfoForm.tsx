import { type FC } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch, useSelector } from 'hooks';
import { clearUserError } from 'store/slices/userSlice';
import { Error, Spinner } from 'components/general';
import { FormInput, ImageUpload } from 'components/input';
import {
  type UpdateUser,
  UpdateUserSchema,
} from 'utils/validators/validationSchems';
import styles from './styles/UpdateUserInfoForm.module.scss';
import { uniqueId } from 'utils/functions';

export type Props = {
  onSubmit: (values: UpdateUser) => void;
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
  const { handleSubmit, control, register } = useForm({
    defaultValues: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      displayName: user?.displayName,
    },
    resolver: zodResolver(UpdateUserSchema),
  });

  if (!user) return <Spinner />;

  const inputContainers = INPUT_CONTAINERS.map(({ id, label, name }) => (
    <FormInput
      key={id}
      name={name}
      control={control}
      label={label}
      placeholder={label}
      classes={inputClasses}
    />
  ));

  return (
    <form className={styles.updateContainer} onSubmit={handleSubmit(onSubmit)}>
      {error && (
        <Error
          data={error.data}
          status={error.status}
          clearError={() => dispatch(clearUserError())}
        />
      )}
      {inputContainers}
      <ImageUpload
        name="file"
        control={control}
        register={register}
        classes={imageUploadClasses}
      />
      <button type="submit" disabled={submitting}>
        Submit
      </button>
    </form>
  );
};

export default UpdateUserInfoForm;
