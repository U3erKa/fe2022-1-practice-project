'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { useDispatch } from 'hooks';
import { RegistrationForm } from 'components/form';
import { Logo } from 'components/general';
import { RegistrationArticles } from 'components/registration';
import { PAGE } from 'constants/general';
import {
  REGISTRATION_ARTICLES_LEFT,
  REGISTRATION_ARTICLES_RIGHT,
} from 'constants/registration';
import { clearAuthError } from 'store/slices/authSlice';
import LogoIcon from 'assets/icons/logo.png';
import styles from './styles/page.module.scss';

const RegistrationPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearAuthError());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.signUpPage}>
      <div className={styles.signUpContainer}>
        <div className={styles.headerSignUpPage}>
          <Logo src={LogoIcon} />
          <div className={styles.linkLoginContainer}>
            <Link href={PAGE.LOGIN} style={{ textDecoration: 'none' }}>
              <span>Login</span>
            </Link>
          </div>
        </div>
        <RegistrationForm />
      </div>
      <div className={styles.footer}>
        <div className={styles.articlesMainContainer}>
          <RegistrationArticles articles={REGISTRATION_ARTICLES_LEFT} />
          <RegistrationArticles articles={REGISTRATION_ARTICLES_RIGHT} />
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
