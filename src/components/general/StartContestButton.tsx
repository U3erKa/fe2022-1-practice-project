'use client';

import Link from 'next/link';
import { useSelector } from 'hooks';
import { CUSTOMER, PAGE } from 'constants/general';
import styles from './styles/Header.module.scss';

export default function StartContestButton() {
  const { isFetching, role } = useSelector(({ userStore }) => {
    const { isFetching, data } = userStore;
    return { isFetching, role: data?.role };
  });

  if (isFetching || role !== CUSTOMER) return null;
  return (
    <Link className={styles.startContestBtn} href={PAGE.START_CONTEST}>
      START CONTEST
    </Link>
  );
}
