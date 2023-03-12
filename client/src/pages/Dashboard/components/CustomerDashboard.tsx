import { useEffect } from 'react';

import { useDispatch, useSelector } from 'hooks';
import { getContests, clearContestsList } from 'store/slices/contestsSlice';

import { TryAgain } from 'components/general';
import { ContestsContainer } from 'components/contest';
import { CustomerFilter } from './CustomerFilter';

import { CUSTOMER } from 'constants/general';

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
      <CustomerFilter />
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
