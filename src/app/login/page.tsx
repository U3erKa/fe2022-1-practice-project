'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { useDispatch } from 'hooks';
import { LoginForm } from 'components/form';
import { Logo } from 'components/general';
import { PAGE, STATIC_IMAGES_PATH } from 'constants/general';
import { clearAuthError } from 'store/slices/authSlice';
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
          <Logo
            srcSet={[
              `${STATIC_IMAGES_PATH}logo.avif`,
              `${STATIC_IMAGES_PATH}logo.webp`,
            ]}
            src={`${STATIC_IMAGES_PATH}logo.png`}
            alt="logo"
          />
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
