import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import isEqual from 'lodash/isEqual';
import { useDispatch, useSelector } from 'hooks';
import {
  getContests,
  clearContestsList,
  setNewCreatorFilter,
} from 'store/slices/contestsSlice';
import { getDataForContest } from 'store/slices/dataForContestSlice';
import { TryAgain, ItemsContainer } from 'components/general';
import { ContestBox } from 'components/contest';
import { CreatorFilter } from './CreatorFilter';
import { CREATOR } from 'constants/general';
import type { CreatorFilter as _CreatorFilter } from 'types/slices';
import styles from '../styles/CreatorDashboard.module.sass';

const CreatorDashboard = () => {
  const { contests, creatorFilter, error } = useSelector(
    ({ contestsList }) => contestsList,
  );
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(getDataForContest());
    if (parseUrlForParams(location.search) && !contests.length)
      getContestsMethod(creatorFilter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    parseUrlForParams(location.search);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  const contestsList = contests.map((contest) => (
    <ContestBox data={contest} key={contest.id} />
  ));

  const getContestsMethod = (filter) => {
    dispatch(
      getContests({
        requestData: { limit: 8, offset: 0, ...filter },
        role: CREATOR,
      }),
    );
  };

  const parseUrlForParams = (search: string) => {
    const obj = queryString.parse(search);
    const filter = {
      typeIndex: obj.typeIndex || 1,
      contestId: obj.contestId ? obj.contestId : '',
      industry: obj.industry ? obj.industry : '',
      awardSort: obj.awardSort || 'asc',
      ownEntries:
        typeof obj.ownEntries === 'undefined' ? false : obj.ownEntries,
    } as _CreatorFilter;
    if (!isEqual(filter, creatorFilter)) {
      dispatch(setNewCreatorFilter(filter));
      dispatch(clearContestsList());
      getContestsMethod(filter);
      return false;
    }
    return true;
  };

  const getPredicateOfRequest = () => {
    const obj: _CreatorFilter = {};
    Object.keys(creatorFilter).forEach((el) => {
      if (creatorFilter[el]) {
        obj[el] = creatorFilter[el];
      }
    });
    obj.ownEntries = creatorFilter.ownEntries;
    return obj;
  };

  const loadMore = (startFrom) => {
    getContestsMethod({
      limit: 8,
      offset: startFrom,
      ...getPredicateOfRequest(),
    });
  };

  const tryLoadAgain = () => {
    dispatch(clearContestsList());
    getContestsMethod({
      limit: 8,
      offset: 0,
      ...getPredicateOfRequest(),
    });
  };

  return (
    <div className={styles.mainContainer}>
      <CreatorFilter />
      {error ? (
        <div className={styles.messageContainer}>
          <TryAgain getData={tryLoadAgain} />
        </div>
      ) : (
        <ItemsContainer items={contestsList} loadMore={loadMore} />
      )}
    </div>
  );
};

export default CreatorDashboard;
