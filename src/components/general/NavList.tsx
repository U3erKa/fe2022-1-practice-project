import Image from 'next/image';
import Link from 'next/link';
import type { HEADER_LIST } from 'constants/header';
import MenuDownIcon from 'assets/icons/menu-down.png';
import styles from './styles/NavList.module.scss';

export type List = typeof HEADER_LIST;
export type ListItem = List[number]['listItem'];

const NavList = ({ list }: { readonly list: List }) => (
  <nav className={styles.nav}>
    {list.map(({ id, text, listItem }) => (
      <li key={id}>
        <span>{text}</span>
        <Image alt="menu" src={MenuDownIcon} />
        <NavListItem list={listItem} />
      </li>
    ))}
  </nav>
);

export const NavListItem = ({ list }: { readonly list: ListItem }) => (
  <ul>
    {list.map(({ id, href, text }, i) => (
      <li className={list.length - 1 === i ? styles.last : undefined} key={id}>
        <Link href={href}>{text}</Link>
      </li>
    ))}
  </ul>
);

export default NavList;
