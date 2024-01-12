import type { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import type { ComponentPropsWithoutRef, FC } from 'react';
import { useDispatch } from 'hooks';
import styles from './styles/CustomerDashboard.module.scss';

export type Props<Filter = any> = ComponentPropsWithoutRef<'div'> & {
  readonly buttons: { name: string; filter: Filter }[];
  readonly filterAction: ActionCreatorWithPayload<Filter>;
  readonly predicate: Filter;
};

export const CustomFilter: FC<Props> = ({
  buttons,
  filterAction,
  predicate,
  ...props
}) => {
  const dispatch = useDispatch();

  const filterButtons = buttons.map(({ name, filter }) => (
    <div
      className={filter === predicate ? styles.activeFilter : styles.filter}
      key={name}
      onClick={() => dispatch(filterAction(filter))}
      {...props}
    >
      {name}
    </div>
  ));

  return <div className={styles.filterContainer}>{filterButtons}</div>;
};
