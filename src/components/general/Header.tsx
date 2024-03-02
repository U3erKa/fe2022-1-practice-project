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
    <section className={styles.fixedHeader}>
      <p className={styles.info}>
        Squadhelp recognized as one of the Most Innovative Companies by Inc
        Magazine.
      </p>
      <Link href={PAGE.DUMMY_LINK}>Read Announcement</Link>
    </section>
    <section className={styles.loginSignnUpHeaders}>
      <p className={styles.numberContainer}>
        <Image alt="phone" src={PhoneIcon} />
        <a href="tel:8773553585">(877)&nbsp;355-3585</a>
      </p>
      <div className={styles.userButtonsContainer}>
        <LoginButtons />
      </div>
    </section>
    <section className={styles.navContainer}>
      <Logo />
      <NavList list={HEADER_LIST} />
      <StartContestButton />
    </section>
  </header>
);

export default Header;
