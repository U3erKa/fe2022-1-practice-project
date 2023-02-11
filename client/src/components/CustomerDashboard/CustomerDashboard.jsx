import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

import {
  getContests,
  clearContestsList,
  setNewCustomerFilter,
} from 'store/slices/contestsSlice';

import { TryAgain } from 'components';
import { ContestsContainer, ContestBox } from 'components/Contest';

import {
  CONTEST_STATUS_ACTIVE,
  CONTEST_STATUS_FINISHED,
  CONTEST_STATUS_PENDING,
  CUSTOMER,
} from 'constants/general';
import styles from './CustomerDashboard.module.sass';

const CustomerDashboard = ({ history }) => {
  const { isFetching, error, contests, customerFilter, haveMore } = useSelector(
    (state) => state.contestsList,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    getContestsMethod();
    return () => {
      dispatch(clearContestsList());
    };
  }, []);

  useEffect(() => {
    getContestsMethod();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customerFilter]);

  const loadMore = (startFrom) => {
    getContests({
      limit: 8,
      offset: startFrom,
      contestStatus: customerFilter,
    });
  };

  const getContestsMethod = () => {
    dispatch(
      getContests({
        requestData: { limit: 8, contestStatus: customerFilter },
        role: CUSTOMER,
      }),
    );
  };

  const goToExtended = (contest_id) => {
    history.push(`/contest/${contest_id}`);
  };

  const setContestList = () => {
    const array = [];
    for (let i = 0; i < contests.length; i++) {
      array.push(
        <ContestBox
          data={contests[i]}
          key={contests[i].id}
          goToExtended={goToExtended}
        />,
      );
    }
    return array;
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
          <ContestsContainer
            isFetching={isFetching}
            loadMore={loadMore}
            history={history}
            haveMore={haveMore}
          >
            {setContestList()}
          </ContestsContainer>
        )}
      </div>
    </div>
  );
};

export default CustomerDashboard;
