import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { isEqual } from 'radash';
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
import { parseQueryString } from 'utils/functions';
import { CREATOR } from 'constants/general';
import type { CreatorFilter as _CreatorFilter } from 'types/slices';
import styles from '../styles/CreatorDashboard.module.sass';
import type { GetActiveContestsParams } from 'types/api/contest';

const CreatorDashboard = () => {
  const { contests, creatorFilter, error, haveMore } = useSelector(
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

  const getContestsMethod = (filter: GetActiveContestsParams) => {
    dispatch(
      getContests({
        requestData: { limit: 8, offset: 0, ...filter },
        role: CREATOR,
      }),
    );
  };

  const parseUrlForParams = (search: string) => {
    const obj = parseQueryString(search);
    const filter = {
      typeIndex: obj.typeIndex || 1,
      contestId: obj.contestId ? obj.contestId : ('' as any),
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
      if (creatorFilter[el as keyof _CreatorFilter]) {
        // @ts-expect-error
        obj[el] = creatorFilter[el as keyof _CreatorFilter];
      }
    });
    obj.ownEntries = creatorFilter.ownEntries;
    return obj;
  };

  const loadMore = (startFrom: number) => {
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
        <ItemsContainer
          haveMore={haveMore}
          items={contestsList}
          loadMore={loadMore}
        />
      )}
    </div>
  );
};

export default CreatorDashboard;
