import classNames from 'classnames';
import { useDispatch } from 'hooks';
import type { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import type { FC } from 'react';
import styles from '../styles/CustomerDashboard.module.sass';

export type Props = {
  buttons: { name: string; filter: string }[];
  filterAction: ActionCreatorWithPayload<any>;
  predicate: string;
  [key: string]: any;
} & JSX.IntrinsicElements['div'];

export const CustomerFilter: FC<Props> = ({
  buttons,
  filterAction,
  predicate,
  ...props
}) => {
  const dispatch = useDispatch();

  const filterButtons = buttons.map(({ name, filter }, i) => (
    <div
      key={i}
      onClick={() => dispatch(filterAction(filter))}
      className={classNames({
        [styles.activeFilter]: filter === predicate,
        [styles.filter]: filter !== predicate,
      })}
      {...props}
    >
      {name}
    </div>
  ));

  return <div className={styles.filterContainer}>{filterButtons}</div>;
};
