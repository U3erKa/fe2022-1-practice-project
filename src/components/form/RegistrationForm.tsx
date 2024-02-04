'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'hooks';
import { Error } from 'components/general';
import {
  AgreeTermOfServiceInput,
  FormInput,
  RoleInput,
} from 'components/input';
import { AUTH_MODE, CREATOR, CUSTOMER } from 'constants/general';
import { checkAuth, clearAuth } from 'store/slices/authSlice';
import { RegistrationSchema, type Registration } from 'utils/schemas';
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

  const { handleSubmit, control } = useForm<Registration>({
    defaultValues: {
      agreeOfTerms: false as any,
      confirmPassword: '',
      displayName: '',
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      role: CUSTOMER,
    },
    resolver: zodResolver(RegistrationSchema),
    mode: 'all',
  });

  const onSubmit = useCallback(
    (values: Registration) => {
      dispatch(
        checkAuth({
          authMode: AUTH_MODE.REGISTER,
          data: values,
          navigate: router.replace,
        }),
      );
    },
    [dispatch, router.replace],
  );

  const handleClearError = useCallback(() => dispatch(clearAuth()), [dispatch]);

  return (
    <div className={styles.signUpFormContainer}>
      {error ? (
        <Error
          clearError={handleClearError}
          data={(error as any).data}
          status={(error as any).status}
        />
      ) : null}
      <div className={styles.headerFormContainer}>
        <h2>CREATE AN ACCOUNT</h2>
        <h4>We always keep your name and email address private.</h4>
      </div>

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.row}>
          <FormInput
            autoComplete="given-name"
            classes={formInputClasses}
            control={control}
            name="firstName"
            placeholder="First name"
            type="text"
          />
          <FormInput
            autoComplete="family-name"
            classes={formInputClasses}
            control={control}
            name="lastName"
            placeholder="Last name"
            type="text"
          />
        </div>
        <div className={styles.row}>
          <FormInput
            autoComplete="nickname"
            classes={formInputClasses}
            control={control}
            name="displayName"
            placeholder="Display Name"
            type="text"
          />
          <FormInput
            autoComplete="email"
            classes={formInputClasses}
            control={control}
            name="email"
            placeholder="Email Address"
          />
        </div>
        <div className={styles.row}>
          <FormInput
            autoComplete="new-password"
            classes={formInputClasses}
            control={control}
            name="password"
            placeholder="Password"
            type="password"
          />
          <FormInput
            autoComplete="new-password"
            classes={formInputClasses}
            control={control}
            name="confirmPassword"
            placeholder="Password confirmation"
            type="password"
          />
        </div>
        <div className={styles.choseRoleContainer}>
          <RoleInput
            defaultChecked
            control={control}
            id={CUSTOMER}
            infoRole="I am looking for a Name, Logo or Tagline for my business, brand or product."
            name="role"
            strRole="Join As a Buyer"
            type="radio"
            value={CUSTOMER}
          />
          <RoleInput
            control={control}
            id={CREATOR}
            infoRole="I plan to submit name ideas, Logo designs or sell names in Domain Marketplace."
            name="role"
            strRole="Join As a Creative"
            type="radio"
            value={CREATOR}
          />
        </div>
        <div className={styles.termsOfService}>
          <AgreeTermOfServiceInput
            control={control}
            id="termsOfService"
            name="agreeOfTerms"
            classes={{
              container: styles.termsOfService,
              warning: styles.fieldWarning,
            }}
          />
        </div>
        <button
          className={styles.submitContainer}
          disabled={isFetching}
          type="submit"
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
