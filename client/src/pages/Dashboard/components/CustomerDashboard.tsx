import { useEffect } from 'react';
import classNames from 'classnames';

import { useDispatch, useSelector } from 'hooks';
import {
  getContests,
  clearContestsList,
  setNewCustomerFilter,
} from 'store/slices/contestsSlice';

import { TryAgain } from 'components/general';
import { ContestsContainer } from 'components/contest';

import {
  CONTEST_STATUS_ACTIVE,
  CONTEST_STATUS_FINISHED,
  CONTEST_STATUS_PENDING,
  CUSTOMER,
} from 'constants/general';
import styles from '../styles/CustomerDashboard.module.sass';

const CustomerDashboard = () => {
  const { error, customerFilter } = useSelector((state) => state.contestsList);
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
      <div className={styles.filterContainer}>
        <div
          onClick={() => dispatch(setNewCustomerFilter(CONTEST_STATUS_ACTIVE))}
          className={classNames({
            [styles.activeFilter]: CONTEST_STATUS_ACTIVE === customerFilter,
            [styles.filter]: CONTEST_STATUS_ACTIVE !== customerFilter,
          })}
        >
          Active Contests
        </div>
        <div
          onClick={() =>
            dispatch(setNewCustomerFilter(CONTEST_STATUS_FINISHED))
          }
          className={classNames({
            [styles.activeFilter]: CONTEST_STATUS_FINISHED === customerFilter,
            [styles.filter]: CONTEST_STATUS_FINISHED !== customerFilter,
          })}
        >
          Completed contests
        </div>
        <div
          onClick={() => dispatch(setNewCustomerFilter(CONTEST_STATUS_PENDING))}
          className={classNames({
            [styles.activeFilter]: CONTEST_STATUS_PENDING === customerFilter,
            [styles.filter]: CONTEST_STATUS_PENDING !== customerFilter,
          })}
        >
          Inactive contests
        </div>
      </div>
      <div className={styles.contestsContainer}>
        {error ? (
          <TryAgain getData={() => tryToGetContest()} />
        ) : (
          <ContestsContainer loadMore={getContestsMethod} />
        )}
      </div>
    </div>
  );
};

export default CustomerDashboard;
