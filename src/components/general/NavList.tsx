import Image from 'next/image';
import Link from 'next/link';
import type { HEADER_LIST } from 'constants/header';
import MenuDownIcon from 'assets/icons/menu-down.png';
import styles from './styles/NavList.module.scss';

export type List = typeof HEADER_LIST;
export type ListItem = List[number]['listItem'];

const NavList = ({ list }: { readonly list: List }) => {
  const mapList = list.map(({ id, text, listItem }) => (
    <li key={id}>
      <span>{text}</span>
      <Image alt="menu" src={MenuDownIcon} />
      <NavListItem list={listItem} />
    </li>
  ));
  return <nav className={styles.nav}>{mapList}</nav>;
};

export const NavListItem = ({ list }: { readonly list: ListItem }) => {
  const mapList = list.map(({ id, href, text }, i) => (
    <li className={list.length - 1 === i ? styles.last : undefined} key={id}>
      <Link href={href}>{text}</Link>
    </li>
  ));
  return <ul>{mapList}</ul>;
};

export default NavList;
