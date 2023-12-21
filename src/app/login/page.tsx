'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { useDispatch } from 'hooks';
import { LoginForm } from 'components/form';
import { Logo } from 'components/general';
import { PAGE } from 'constants/general';
import { clearAuthError } from 'store/slices/authSlice';
import LogoIcon from 'assets/icons/logo.png';
import styles from './styles/page.module.scss';

const LoginPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearAuthError());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.loginContainer}>
        <div className={styles.headerSignUpPage}>
          <Logo src={LogoIcon} />
          <div className={styles.linkLoginContainer}>
            <Link href={PAGE.REGISTER} style={{ textDecoration: 'none' }}>
              <span>Signup</span>
            </Link>
          </div>
        </div>
        <div className={styles.loginFormContainer}>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
