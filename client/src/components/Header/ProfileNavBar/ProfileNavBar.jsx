import { Link } from 'react-router-dom';
import styles from './ProfileNavBar.module.sass';

export default function ProfileNavBar({ list, logOut }) {
  const mapList = list.map(({ id, href, text }) => (
    <li key={id} className={styles.navListItem}>
      <Link
        className={styles.navListLink}
        to={href}
        style={{ textDecoration: 'none' }}
      >
        <span className={styles.navListLinkText}>{text}</span>
      </Link>
    </li>
  ));

  return (
    <ul className={styles.navList}>
      {mapList}
      <li className={styles.navListItem}>
        <button className={styles.navListBtn} onClick={logOut}>
          Logout
        </button>
      </li>
    </ul>
  );
}
