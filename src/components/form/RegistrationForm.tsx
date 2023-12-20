import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch, useSelector } from 'hooks';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Error } from 'components/general';
import {
  AgreeTermOfServiceInput,
  FormInput,
  RoleInput,
} from 'components/input';
import { AUTH_MODE, CREATOR, CUSTOMER } from 'constants/general';
import { checkAuth, clearAuth } from 'store/slices/authSlice';
import { type Registration, RegistrationSchema } from 'utils/schemas';
import styles from './styles/RegistrationForm.module.scss';

const formInputClasses = {
  container: styles.inputContainer,
  input: styles.input,
  warning: styles.fieldWarning,
  notValid: styles.notValid,
  valid: styles.valid,
};

const RegistrationForm = () => {
  const { error, isFetching } = useSelector(({ auth }) => auth);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    return () => {
      dispatch(clearAuth());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { handleSubmit, control } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      displayName: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: CUSTOMER,
      agreeOfTerms: false,
    },
    resolver: zodResolver(RegistrationSchema),
    mode: 'all',
  });

  const onSubmit = (values: Registration) => {
    dispatch(
      checkAuth({
        data: values,
        navigate: router.push,
        authMode: AUTH_MODE.REGISTER,
      }),
    );
  };

  return (
    <div className={styles.signUpFormContainer}>
      {error && (
        <Error
          data={error.data}
          status={error.status}
          clearError={() => dispatch(clearAuth())}
        />
      )}
      <div className={styles.headerFormContainer}>
        <h2>CREATE AN ACCOUNT</h2>
        <h4>We always keep your name and email address private.</h4>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.row}>
          <FormInput
            name="firstName"
            control={control}
            classes={formInputClasses}
            type="text"
            autoComplete="given-name"
            placeholder="First name"
          />
          <FormInput
            name="lastName"
            control={control}
            classes={formInputClasses}
            type="text"
            autoComplete="family-name"
            placeholder="Last name"
          />
        </div>
        <div className={styles.row}>
          <FormInput
            name="displayName"
            control={control}
            classes={formInputClasses}
            type="text"
            autoComplete="nickname"
            placeholder="Display Name"
          />
          <FormInput
            name="email"
            control={control}
            classes={formInputClasses}
            autoComplete="email"
            placeholder="Email Address"
          />
        </div>
        <div className={styles.row}>
          <FormInput
            name="password"
            control={control}
            classes={formInputClasses}
            type="password"
            autoComplete="new-password"
            placeholder="Password"
          />
          <FormInput
            name="confirmPassword"
            control={control}
            classes={formInputClasses}
            type="password"
            autoComplete="new-password"
            placeholder="Password confirmation"
          />
        </div>
        <div className={styles.choseRoleContainer}>
          <RoleInput
            name="role"
            control={control}
            type="radio"
            defaultChecked
            value={CUSTOMER}
            strRole="Join As a Buyer"
            infoRole="I am looking for a Name, Logo or Tagline for my business, brand or product."
            id={CUSTOMER}
          />
          <RoleInput
            name="role"
            control={control}
            type="radio"
            value={CREATOR}
            strRole="Join As a Creative"
            infoRole="I plan to submit name ideas, Logo designs or sell names in Domain Marketplace."
            id={CREATOR}
          />
        </div>
        <div className={styles.termsOfService}>
          <AgreeTermOfServiceInput
            name="agreeOfTerms"
            control={control}
            classes={{
              container: styles.termsOfService,
              warning: styles.fieldWarning,
            }}
            id="termsOfService"
          />
        </div>
        <button
          type="submit"
          disabled={isFetching}
          className={styles.submitContainer}
        >
          <span className={styles.inscription}>
            {isFetching ? 'Submitting...' : 'Create Account'}
          </span>
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
