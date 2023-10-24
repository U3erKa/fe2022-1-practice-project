import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'hooks';
import { checkAuth, clearAuth } from 'store/slices/authSlice';
import { Error } from 'components/general';
import { LoginSchem } from 'utils/validators/validationSchems';
import { AUTH_MODE } from 'constants/general';
import type { LoginParams } from 'types/api/auth';
import styles from './styles/LoginForm.module.sass';

const LoginForm = () => {
  const { error, isFetching } = useSelector(({ auth }) => auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      dispatch(clearAuth());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    handleSubmit,
    formState: { touchedFields, dirtyFields, errors },
    register,
  } = useForm({
    defaultValues: { email: '', password: '' },
    resolver: yupResolver(LoginSchem),
    mode: 'all',
  });

  const onSubmit = (values: LoginParams) => {
    dispatch(checkAuth({ data: values, navigate, authMode: AUTH_MODE.LOGIN }));
  };

  const inputClassName = (field: keyof LoginParams) =>
    clsx(styles.input, {
      [styles.notValid]: touchedFields[field] && !dirtyFields[field],
      [styles.valid]: touchedFields[field] && dirtyFields[field],
    });

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
        <div className={styles.inputContainer}>
          <input
            className={inputClassName('email')}
            type="email"
            autoComplete="username"
            placeholder={'Email Address'}
            {...register('email')}
          />
          {errors.email && (
            <span className={styles.fieldWarning}>{errors.email.message}</span>
          )}
        </div>
        <div className={styles.inputContainer}>
          <input
            className={inputClassName('password')}
            type="password"
            autoComplete="current-password"
            placeholder={'Password'}
            {...register('password')}
          />
          {errors.password && (
            <span className={styles.fieldWarning}>
              {errors.password.message}
            </span>
          )}
        </div>
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
