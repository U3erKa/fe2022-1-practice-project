import { Link, useNavigate } from 'react-router-dom';

import { useDispatch } from 'hooks';
import { clearUserStore } from 'store/slices/userSlice';
import { ROUTE } from 'constants/general';
import styles from './styles/ProfileNavBar.module.sass';

export default function ProfileNavBar({ list, activeEvents }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.clear();
    dispatch(clearUserStore());
    navigate(ROUTE.LOGIN);
  };

  const mapList = list.map(({ id, href, text }) => (
    <li key={id} className={styles.navListItem}>
      <Link
        className={styles.navListLink}
        to={href}
        style={{ textDecoration: 'none' }}
      >
        <span className={styles.navListLinkText}>{text}</span>
        {href === '/events' && !!activeEvents && (
          <div className={styles.badge}>{activeEvents}</div>
        )}
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
