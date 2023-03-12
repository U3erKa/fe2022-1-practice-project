import classNames from 'classnames';
import { useDispatch, useSelector } from 'hooks';
import { setNewCustomerFilter } from 'store/slices/contestsSlice';

import styles from '../styles/CustomerDashboard.module.sass';

import {
  CONTEST_STATUS_ACTIVE,
  CONTEST_STATUS_FINISHED,
  CONTEST_STATUS_PENDING,
} from 'constants/general';

import type { FC } from 'react';
import type { Status } from 'types/contest';

const buttons: { name: string; filter: Status }[] = [
  { name: 'Active Contests', filter: CONTEST_STATUS_ACTIVE },
  { name: 'Completed contests', filter: CONTEST_STATUS_FINISHED },
  { name: 'Inactive contests', filter: CONTEST_STATUS_PENDING },
];

export const CustomerFilter: FC = () => {
  const { customerFilter } = useSelector((state) => state.contestsList);
  const dispatch = useDispatch();

  const filterButtons = buttons.map(({ name, filter }, i) => (
    <div
      key={i}
      onClick={() => dispatch(setNewCustomerFilter(filter))}
      className={classNames({
        [styles.activeFilter]: filter === customerFilter,
        [styles.filter]: filter !== customerFilter,
      })}
    >
      {name}
    </div>
  ));

  return <div className={styles.filterContainer}>{filterButtons}</div>;
};
