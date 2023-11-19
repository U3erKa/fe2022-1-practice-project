import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'hooks';
import { checkAuth, clearAuth } from 'store/slices/authSlice';
import { FormInput } from 'components/input';
import { Error } from 'components/general';
import { type Login, LoginSchema } from 'utils/schemas';
import { AUTH_MODE } from 'constants/general';
import type { FormInputClasses } from 'components/input/FormInput';
import styles from './styles/LoginForm.module.scss';

const formInputClasses = {
  container: styles.inputContainer,
  input: styles.input,
  warning: styles.fieldWarning,
  notValid: styles.notValid,
  valid: styles.valid,
} satisfies FormInputClasses;

const LoginForm = () => {
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
    defaultValues: { email: '', password: '' },
    resolver: zodResolver(LoginSchema),
    mode: 'all',
  });

  const onSubmit = (values: Login) => {
    dispatch(
      checkAuth({
        data: values,
        navigate: router.push,
        authMode: AUTH_MODE.LOGIN,
      }),
    );
  };

  return (
    <div className={styles.loginForm}>
      {error && (
        <Error
          data={error.data}
          status={error.status}
          clearError={() => dispatch(clearAuth())}
        />
      )}
      <h2>LOGIN TO YOUR ACCOUNT</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <FormInput
          control={control}
          classes={formInputClasses}
          type="email"
          autoComplete="username"
          placeholder="Email Address"
          name={'email'}
        />
        <FormInput
          control={control}
          classes={formInputClasses}
          type="password"
          autoComplete="current-password"
          placeholder="Password"
          name={'password'}
        />
        <button
          type="submit"
          disabled={isFetching}
          className={styles.submitContainer}
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
