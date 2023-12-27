import { useEffect } from 'react';
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
  const { isFetching, haveMore, error, customerFilter, contests } = useSelector(
    (state) => state.contestsList,
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
    <ContestBox data={contest} key={contest.id} />
  ));

  const getContestsMethod = (startFrom = 0) => {
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
  };

  const tryToGetContest = () => {
    dispatch(clearContestsList());
    getContestsMethod();
  };

  return (
    <div className={styles.mainContainer}>
      <CustomFilter
        filterAction={setNewCustomerFilter}
        buttons={buttons}
        predicate={customerFilter}
      />
      <div className={styles.contestsContainer}>
        {error ? (
          <TryAgain getData={() => tryToGetContest()} />
        ) : (
          <ItemsContainer
            isFetching={isFetching}
            haveMore={haveMore}
            items={contestsList}
            loadMore={getContestsMethod}
          />
        )}
      </div>
    </div>
  );
};

export default CustomerDashboard;
