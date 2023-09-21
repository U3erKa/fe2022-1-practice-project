import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useDispatch } from 'hooks';
import { clearAuthError } from 'store/slices/authSlice';

import { Logo } from 'components/general';
import { RegistrationForm } from 'components/form';
import { RegistrationArticles } from '.';

import { STATIC_IMAGES_PATH } from 'constants/general';
import {
  REGISTRATION_ARTICLES_LEFT,
  REGISTRATION_ARTICLES_RIGHT,
} from 'constants/registration';

import styles from './styles/RegistrationPage.module.sass';

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
            <Link to="/login" style={{ textDecoration: 'none' }}>
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
