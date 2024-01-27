import Image from 'next/image';
import Link from 'next/link';
import { Logo, StartContestButton } from 'components/general';
import { PAGE } from 'constants/general';
import { HEADER_LIST } from 'constants/header';
import { LoginButtons, NavList } from '.';
import PhoneIcon from 'assets/icons/phone.png';
import styles from './styles/Header.module.scss';

const Header = () => (
  <header className={styles.headerContainer}>
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
        <LoginButtons />
      </div>
    </div>
    <div className={styles.navContainer}>
      <Logo />
      <div className={styles.leftNav}>
        <div>
          <NavList list={HEADER_LIST} />
        </div>
        <StartContestButton />
      </div>
    </div>
  </header>
);

export default Header;
