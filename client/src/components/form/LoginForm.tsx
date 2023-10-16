import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'hooks';
import { checkAuth, clearAuth } from 'store/slices/authSlice';
import { Error } from 'components/general';
import { FormInput } from 'components/input';
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

  const onSubmit = (values: LoginParams) => {
    dispatch(checkAuth({ data: values, navigate, authMode: AUTH_MODE.LOGIN }));
  };

  const formInputClasses = {
    container: styles.inputContainer,
    input: styles.input,
    warning: styles.fieldWarning,
    notValid: styles.notValid,
    valid: styles.valid,
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
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={onSubmit}
        validationSchema={LoginSchem}
      >
        <Form className={styles.form}>
          <FormInput
            classes={formInputClasses}
            name="email"
            type="text"
            label="Email Address"
          />
          <FormInput
            classes={formInputClasses}
            name="password"
            type="password"
            label="Password"
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
        </Form>
      </Formik>
    </div>
  );
};

export default LoginForm;
