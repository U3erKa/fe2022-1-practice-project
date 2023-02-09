import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { clearAuthError } from 'store/slices/authSlice';
import { Logo } from 'components';
import { LoginForm } from 'components/FormComponents';

import { STATIC_IMAGES_PATH } from 'constants/general';
import styles from './LoginPage.module.sass';

const LoginPage = ({ history }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearAuthError());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.loginContainer}>
        <div className={styles.headerSignUpPage}>
          <Logo src={`${STATIC_IMAGES_PATH}logo.png`} alt="logo" />
          <div className={styles.linkLoginContainer}>
            <Link to="/registration" style={{ textDecoration: 'none' }}>
              <span>Signup</span>
            </Link>
          </div>
        </div>
        <div className={styles.loginFormContainer}>
          <LoginForm history={history} />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
