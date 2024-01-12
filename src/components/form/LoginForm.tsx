import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'hooks';
import { Error } from 'components/general';
import { FormInput } from 'components/input';
import type { FormInputClasses } from 'components/input/FormInput';
import { AUTH_MODE } from 'constants/general';
import { checkAuth, clearAuth } from 'store/slices/authSlice';
import { type Login, LoginSchema } from 'utils/schemas';
import styles from './styles/LoginForm.module.scss';

const formInputClasses = {
  container: styles.inputContainer,
  input: styles.input,
  notValid: styles.notValid,
  valid: styles.valid,
  warning: styles.fieldWarning,
} satisfies FormInputClasses;

const LoginForm = () => {
  const { error, isFetching } = useSelector(({ auth }) => {
    const { error, isFetching } = auth;
    return { error, isFetching };
  });
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    return () => {
      dispatch(clearAuth());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { handleSubmit, control } = useForm({
    defaultValues: { email: '', password: '' },
    resolver: zodResolver(LoginSchema),
    mode: 'all',
  });

  const onSubmit = (values: Login) => {
    dispatch(
      checkAuth({
        authMode: AUTH_MODE.LOGIN,
        data: values,
        navigate: router.replace,
      }),
    );
  };

  const handleClearError = useCallback(() => dispatch(clearAuth()), [dispatch]);

  return (
    <div className={styles.loginForm}>
      {error ? (
        <Error
          clearError={handleClearError}
          data={(error as any).data}
          status={(error as any).status}
        />
      ) : null}
      <h2>LOGIN TO YOUR ACCOUNT</h2>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          autoComplete="username"
          classes={formInputClasses}
          control={control}
          name={'email'}
          placeholder="Email Address"
          type="email"
        />
        <FormInput
          autoComplete="current-password"
          classes={formInputClasses}
          control={control}
          name={'password'}
          placeholder="Password"
          type="password"
        />
        <button
          className={styles.submitContainer}
          disabled={isFetching}
          type="submit"
        >
          <span className={styles.inscription}>
            {isFetching ? 'Submitting...' : 'Login'}
          </span>
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
