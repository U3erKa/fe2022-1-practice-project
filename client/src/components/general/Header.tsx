import { Link } from 'react-router-dom';

import { useSelector } from 'hooks';
import { Logo, Picture, Spinner } from 'components/general';
import { LoginButtons, NavList } from '.';

import { CUSTOMER, DUMMY_LINK, STATIC_IMAGES_PATH } from 'constants/general';
import { HEADER_LIST } from 'constants/header';
import styles from './styles/Header.module.scss';

const Header = () => {
  const { data: user, isFetching } = useSelector((state) => state.userStore);

  const renderLoginButtons = () => {
    if (user) {
      return <LoginButtons data={user} />;
    }
    return (
      <>
        <Link to="/login" style={{ textDecoration: 'none' }}>
          <span className={styles.btn}>LOGIN</span>
        </Link>
        <Link to="/registration" style={{ textDecoration: 'none' }}>
          <span className={styles.btn}>SIGN UP</span>
        </Link>
      </>
    );
  };

  if (isFetching) {
    return <Spinner />;
  }

  return (
    <div className={styles.headerContainer}>
      <div className={styles.fixedHeader}>
        <span className={styles.info}>
          Squadhelp recognized as one of the Most Innovative Companies by Inc
          Magazine.
        </span>
        <Link to={DUMMY_LINK}>Read Announcement</Link>
      </div>
      <div className={styles.loginSignnUpHeaders}>
        <div className={styles.numberContainer}>
          <Picture
            srcSet={[
              `${STATIC_IMAGES_PATH}phone.avif`,
              `${STATIC_IMAGES_PATH}phone.webp`,
            ]}
            src={`${STATIC_IMAGES_PATH}phone.png`}
            alt="phone"
          />
          <a href="tel:8773553585">(877)&nbsp;355-3585</a>
        </div>
        <div className={styles.userButtonsContainer}>
          {renderLoginButtons()}
        </div>
      </div>
      <div className={styles.navContainer}>
        <Logo />
        <div className={styles.leftNav}>
          <div className={styles.nav}>
            <NavList list={HEADER_LIST} />
          </div>
          {user && user.role === CUSTOMER && (
            <Link to="/startContest" className={styles.startContestBtn}>
              START CONTEST
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
