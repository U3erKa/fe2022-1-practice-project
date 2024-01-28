import Link from 'next/link';
import { LoginForm } from 'components/form';
import { Logo, OnlyUnauthorizedUser } from 'components/general';
import { PAGE } from 'constants/general';
import LogoIcon from 'assets/icons/logo.png';
import styles from './styles/page.module.scss';

const LoginPage = () => (
  <OnlyUnauthorizedUser>
    <main className={styles.mainContainer}>
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
    </main>
  </OnlyUnauthorizedUser>
);

export default LoginPage;
