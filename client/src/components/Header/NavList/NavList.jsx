import { STATIC_IMAGES_PATH } from 'constants/general';
import styles from './NavList.module.sass';

export default function NavList({ list }) {
  const mapList = list.map(({ id, text, listItem }) => (
    <li key={id}>
      <span>{text}</span>
      <img src={`${STATIC_IMAGES_PATH}menu-down.png`} alt="menu" />
      <NavListItem list={listItem} />
    </li>
  ));
  return <ul className={styles.nav}>{mapList}</ul>;
}

export function NavListItem({ list }) {
  const mapList = list.map(({ id, href, text }, i) => (
    <li key={id} className={list.length - 1 === i ? styles.last : undefined}>
      <a href={href}>{text}</a>
    </li>
  ));
  return <ul>{mapList}</ul>;
}