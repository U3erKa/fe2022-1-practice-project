import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Logo, Spinner } from 'components';
import { LoginButtons, NavList } from 'components/Header';

import { STATIC_IMAGES_PATH, CREATOR, DUMMY_LINK } from 'constants/general';
import { HEADER_LIST } from 'constants/header';
import styles from './Header.module.sass';

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
          <img src={`${STATIC_IMAGES_PATH}phone.png`} alt="phone" />
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
          {user && user.role !== CREATOR && (
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
