'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'hooks';
import { LoginForm } from 'components/form';
import { Logo } from 'components/general';
import { PAGE } from 'constants/general';
import { clearAuthError } from 'store/slices/authSlice';
import LogoIcon from 'assets/icons/logo.png';
import styles from './styles/page.module.scss';

const LoginPage = () => {
  const user = useSelector(({ userStore }) => userStore.data);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(clearAuthError());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (user) {
    router.replace(PAGE.HOME);
    return;
  }

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
