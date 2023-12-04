import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import { isEqual } from 'radash';
import { useDispatch, useSelector } from 'store';
import {
  clearContestsList,
  getContests,
  setNewCreatorFilter,
} from 'store/slices/contestsSlice';
import { getDataForContest } from 'store/slices/dataForContestSlice';
import { ItemsContainer, TryAgain } from 'components/general';
import { ContestBox } from 'components/contest';
import { CreatorFilter } from './CreatorFilter';
import { CREATOR } from 'constants/general';
import type { CreatorFilter as _CreatorFilter } from 'types/slices';
import type { GetActiveContestsParams } from 'types/api/contest';
import styles from './styles/CreatorDashboard.module.scss';

const CreatorDashboard = () => {
  const { contests, creatorFilter, error, haveMore } = useSelector(
    ({ contestsList }) => contestsList,
  );
  const dispatch = useDispatch();
  const searchParams = useSearchParams();

  const getContestsMethod = useCallback(
    (filter: GetActiveContestsParams) => {
      dispatch(
        getContests({
          requestData: { limit: 8, offset: 0, ...filter },
          role: CREATOR,
        }),
      );
    },
    [dispatch],
  );

  const parseUrlForParams = useCallback(() => {
    const filter = {
      typeIndex: searchParams.get('typeIndex') ?? '1',
      contestId: searchParams.get('contestId') ?? '',
      industry: searchParams.get('industry') ?? '',
      awardSort: searchParams.get('awardSort') ?? 'asc',
      ownEntries: searchParams.get('ownEntries') ?? false,
    } as unknown as _CreatorFilter;
    if (isEqual(filter, creatorFilter)) return true;
    dispatch(setNewCreatorFilter(filter));
    dispatch(clearContestsList());
    getContestsMethod(filter);
    return false;
  }, [creatorFilter, dispatch, getContestsMethod, searchParams]);

  useEffect(() => {
    dispatch(getDataForContest());
    if (parseUrlForParams() && !contests.length)
      getContestsMethod(creatorFilter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    parseUrlForParams();
  }, [parseUrlForParams, searchParams]);

  const contestsList = contests.map((contest) => (
    <ContestBox data={contest} key={contest.id} />
  ));

  const getPredicateOfRequest = () => {
    const obj: typeof creatorFilter = {};
    for (const el in creatorFilter) {
      if (Object.hasOwn(creatorFilter, el)) {
        const value = creatorFilter[el as keyof typeof creatorFilter];
        // @ts-expect-error
        if (value != null) obj[el] = value;
      }
    }
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
