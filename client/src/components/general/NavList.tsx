import { Link } from 'react-router-dom';
import { Picture } from 'components/general';
import { STATIC_IMAGES_PATH } from 'constants/general';
import styles from './styles/NavList.module.sass';

export default function NavList({ list }) {
  const mapList = list.map(({ id, text, listItem }) => (
    <li key={id}>
      <span>{text}</span>
      <Picture
        srcSet={[
          `${STATIC_IMAGES_PATH}menu-down.avif`,
          `${STATIC_IMAGES_PATH}menu-down.webp`,
        ]}
        src={`${STATIC_IMAGES_PATH}menu-down.png`}
        alt="menu"
      />
      <NavListItem list={listItem} />
    </li>
  ));
  return <ul className={styles.nav}>{mapList}</ul>;
}

export function NavListItem({ list }) {
  const mapList = list.map(({ id, href, text }, i) => (
    <li key={id} className={list.length - 1 === i ? styles.last : undefined}>
      <Link to={href}>{text}</Link>
    </li>
  ));
  return <ul>{mapList}</ul>;
}
