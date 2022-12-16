import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../Header.module.sass'

export default function ProfileNavBar({ list, logOut }) {
  const mapList = list.map(({ id, href, text }) => (
    <li key={id} className={styles.navListItem}>
      <Link to={href} style={{ textDecoration: 'none' }}>
        <span>{text}</span>
      </Link>
    </li>
  ));

  return (
    <ul className={styles.navList}>
      {mapList}
      <li className={styles.navListItem}>
        <button onClick={logOut}>Logout</button>
      </li>
    </ul>
  );
}
