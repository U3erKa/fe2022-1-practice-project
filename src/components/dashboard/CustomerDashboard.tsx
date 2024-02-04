import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'hooks';
import { ContestBox } from 'components/contest';
import { ItemsContainer, TryAgain } from 'components/general';
import {
  CONTEST_STATUS_ACTIVE,
  CONTEST_STATUS_FINISHED,
  CONTEST_STATUS_PENDING,
  CUSTOMER,
} from 'constants/general';
import {
  clearContestsList,
  getContests,
  setNewCustomerFilter,
} from 'store/slices/contestsSlice';
import type { Status } from 'types/contest';
import { CustomFilter } from './CustomFilter';
import styles from './styles/CustomerDashboard.module.scss';

const buttons: { name: string; filter: Status }[] = [
  { filter: CONTEST_STATUS_ACTIVE, name: 'Active Contests' },
  { filter: CONTEST_STATUS_FINISHED, name: 'Completed contests' },
  { filter: CONTEST_STATUS_PENDING, name: 'Inactive contests' },
];

const CustomerDashboard = () => {
  const { contests, customerFilter, error, haveMore, isFetching } = useSelector(
    ({ contestsList }) => {
      const { contests, customerFilter, error, haveMore, isFetching } =
        contestsList;
      return { contests, customerFilter, error, haveMore, isFetching };
    },
  );
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearContestsList());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getContestsMethod();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customerFilter]);

  const contestsList = contests.map((contest) => (
    <ContestBox data={contest as any} key={contest.id} />
  ));

  const getContestsMethod = useCallback(
    (startFrom = 0) => {
      dispatch(
        getContests({
          requestData: {
            contestStatus: customerFilter,
            limit: 8,
            offset: startFrom,
          },
          role: CUSTOMER,
        }),
      );
    },
    [customerFilter, dispatch],
  );

  const tryToGetContest = useCallback(() => {
    dispatch(clearContestsList());
    getContestsMethod();
  }, [getContestsMethod, dispatch]);

  return (
    <main className={styles.mainContainer}>
      <CustomFilter
        buttons={buttons}
        filterAction={setNewCustomerFilter}
        predicate={customerFilter}
      />
      <div className={styles.contestsContainer}>
        {error ? (
          <TryAgain getData={tryToGetContest} />
        ) : (
          <ItemsContainer
            haveMore={haveMore}
            isFetching={isFetching}
            items={contestsList}
            loadMore={getContestsMethod}
          />
        )}
      </div>
    </main>
  );
};

export default CustomerDashboard;
