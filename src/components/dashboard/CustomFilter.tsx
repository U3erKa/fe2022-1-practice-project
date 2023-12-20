import type { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import clsx from 'clsx';
import type { FC } from 'react';
import { useDispatch } from 'store';
import styles from './styles/CustomerDashboard.module.scss';

export type Props<Filter = any> = {
  buttons: { name: string; filter: Filter }[];
  filterAction: ActionCreatorWithPayload<Filter>;
  predicate: Filter;
  [key: string]: any;
} & JSX.IntrinsicElements['div'];

export const CustomFilter: FC<Props> = ({
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
      className={clsx({
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
