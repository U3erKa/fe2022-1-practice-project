import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, type FC } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'hooks';
import { Error, Spinner } from 'components/general';
import { FormInput, ImageUpload } from 'components/input';
import { clearUserError } from 'store/slices/userSlice';
import { uniqueId } from 'utils/functions';
import { UpdateUserSchema, type UpdateUser } from 'utils/schemas';
import styles from './styles/UpdateUserInfoForm.module.scss';

export type Props = {
  readonly onSubmit: (values: UpdateUser) => void;
  readonly submitting?: boolean;
};

const INPUT_CONTAINERS = [
  { id: uniqueId(), label: 'First Name', name: 'firstName' },
  { id: uniqueId(), label: 'Last Name', name: 'lastName' },
  { id: uniqueId(), label: 'Display Name', name: 'displayName' },
] as const;

const inputClasses = {
  container: styles.inputContainer,
  input: styles.input,
  notValid: styles.notValid,
  warning: styles.error,
};

const imageUploadClasses = {
  imgStyle: styles.imgStyle,
  inputContainer: styles.uploadInputContainer,
  uploadContainer: styles.imageUploadContainer,
};

const UpdateUserInfoForm: FC<Props> = ({ onSubmit, submitting }) => {
  const { error, user } = useSelector(({ userStore }) => {
    const { error, data: user } = userStore;
    return { error, user };
  });
  const dispatch = useDispatch();
  const { handleSubmit, control, register } = useForm({
    defaultValues: {
      displayName: user?.displayName,
      firstName: user?.firstName,
      lastName: user?.lastName,
      file: undefined,
    },
    resolver: zodResolver(UpdateUserSchema),
  });

  const handleClearError = useCallback(
    () => dispatch(clearUserError()),
    [dispatch],
  );

  if (!user) return <Spinner />;

  return (
    <form
      className={styles.updateContainer}
      onSubmit={handleSubmit(onSubmit as any)}
    >
      {error ? (
        <Error
          clearError={handleClearError}
          data={(error as any).data}
          status={(error as any).status}
        />
      ) : null}
      {INPUT_CONTAINERS.map(({ id, label, name }) => (
        <FormInput
          classes={inputClasses}
          control={control}
          key={id}
          label={label}
          name={name}
          placeholder={label}
        />
      ))}
      <ImageUpload
        classes={imageUploadClasses}
        control={control}
        name="file"
        register={register}
      />
      <button disabled={submitting} type="submit">
        Submit
      </button>
    </form>
  );
};

export default UpdateUserInfoForm;
