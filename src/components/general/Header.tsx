'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useSelector } from 'hooks';
import { Logo, Spinner } from 'components/general';
import { CUSTOMER, PAGE } from 'constants/general';
import { HEADER_LIST } from 'constants/header';
import { LoginButtons, NavList } from '.';
import PhoneIcon from 'assets/icons/phone.png';
import styles from './styles/Header.module.scss';

const Header = () => {
  const { data: user, isFetching } = useSelector((state) => state.userStore);

  const renderLoginButtons = () => {
    if (user) {
      return <LoginButtons data={user} />;
    }
    return (
      <>
        <Link href={PAGE.LOGIN} style={{ textDecoration: 'none' }}>
          <span>LOGIN</span>
        </Link>
        <Link href={PAGE.REGISTER} style={{ textDecoration: 'none' }}>
          <span>SIGN UP</span>
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
        <Link href={PAGE.DUMMY_LINK}>Read Announcement</Link>
      </div>
      <div className={styles.loginSignnUpHeaders}>
        <div className={styles.numberContainer}>
          <Image alt="phone" src={PhoneIcon} />
          <a href="tel:8773553585">(877)&nbsp;355-3585</a>
        </div>
        <div className={styles.userButtonsContainer}>
          {renderLoginButtons()}
        </div>
      </div>
      <div className={styles.navContainer}>
        <Logo />
        <div className={styles.leftNav}>
          <div>
            <NavList list={HEADER_LIST} />
          </div>
          {user && user.role === CUSTOMER ? (
            <Link className={styles.startContestBtn} href={PAGE.START_CONTEST}>
              START CONTEST
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Header;
