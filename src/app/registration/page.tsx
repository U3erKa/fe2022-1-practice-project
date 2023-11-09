'use client';
import Link from 'next/link';
import { useEffect } from 'react';
import { useDispatch } from 'store';
import { clearAuthError } from 'store/slices/authSlice';
import { Logo } from 'components/general';
import { RegistrationForm } from 'components/form';
import { RegistrationArticles } from 'components/registration';
import { ROUTE, STATIC_IMAGES_PATH } from 'constants/general';
import {
  REGISTRATION_ARTICLES_LEFT,
  REGISTRATION_ARTICLES_RIGHT,
} from 'constants/registration';
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
          <Logo
            srcSet={[
              `${STATIC_IMAGES_PATH}logo.avif`,
              `${STATIC_IMAGES_PATH}logo.webp`,
            ]}
            src={`${STATIC_IMAGES_PATH}logo.png`}
          />
          <div className={styles.linkLoginContainer}>
            <Link href={ROUTE.LOGIN} style={{ textDecoration: 'none' }}>
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
