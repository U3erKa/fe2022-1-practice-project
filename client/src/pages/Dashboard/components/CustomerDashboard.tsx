import { useEffect } from 'react';
import { useDispatch, useSelector } from 'hooks';
import {
  getContests,
  clearContestsList,
  setNewCustomerFilter,
} from 'store/slices/contestsSlice';
import { TryAgain } from 'components/general';
import { ContestBox, ContestsContainer } from 'components/contest';
import { CustomFilter } from './CustomFilter';
import {
  CONTEST_STATUS_ACTIVE,
  CONTEST_STATUS_FINISHED,
  CONTEST_STATUS_PENDING,
  CUSTOMER,
} from 'constants/general';
import type { Status } from 'types/contest';
import styles from '../styles/CustomerDashboard.module.sass';

const buttons: { name: string; filter: Status }[] = [
  { name: 'Active Contests', filter: CONTEST_STATUS_ACTIVE },
  { name: 'Completed contests', filter: CONTEST_STATUS_FINISHED },
  { name: 'Inactive contests', filter: CONTEST_STATUS_PENDING },
];

const CustomerDashboard = () => {
  const { error, customerFilter, contests } = useSelector(
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
          limit: 8,
          offset: startFrom,
          contestStatus: customerFilter,
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
          <ContestsContainer
            items={contestsList}
            loadMore={getContestsMethod}
          />
        )}
      </div>
    </div>
  );
};

export default CustomerDashboard;
