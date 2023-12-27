import type { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import clsx from 'clsx';
import type { FC } from 'react';
import { useDispatch } from 'hooks';
import styles from './styles/CustomerDashboard.module.scss';

export type Props<Filter = any> = {
  readonly buttons: { name: string; filter: Filter }[];
  readonly filterAction: ActionCreatorWithPayload<Filter>;
  readonly predicate: Filter;
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
      className={clsx({
        [styles.activeFilter]: filter === predicate,
        [styles.filter]: filter !== predicate,
      })}
      onClick={() => dispatch(filterAction(filter))}
      {...props}
    >
      {name}
    </div>
  ));

  return <div className={styles.filterContainer}>{filterButtons}</div>;
};
