import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'hooks';
import { PAGE } from 'constants/general';
import type { PROFILE_NAVBAR } from 'constants/header';
import { clearUserStore } from 'store/slices/userSlice';
import styles from './styles/ProfileNavBar.module.scss';

export type Props = {
  readonly list: typeof PROFILE_NAVBAR;
  readonly activeEvents: number;
};

export default function ProfileNavBar({ list, activeEvents }: Props) {
  const dispatch = useDispatch();
  const router = useRouter();

  const logOut = () => {
    localStorage.clear();
    dispatch(clearUserStore());
    router.push(PAGE.LOGIN);
  };

  const mapList = list.map(({ id, href, text }) => (
    <li key={id} className={styles.navListItem}>
      <Link href={href} style={{ textDecoration: 'none' }}>
        <span className={styles.navListLinkText}>{text}</span>
        {href === PAGE.EVENTS && !!activeEvents && (
          <div className={styles.badge}>{activeEvents}</div>
        )}
      </Link>
    </li>
  ));

  return (
    <ul>
      {mapList}
      <li className={styles.navListItem}>
        <button className={styles.navListBtn} onClick={logOut}>
          Logout
        </button>
      </li>
    </ul>
  );
}
