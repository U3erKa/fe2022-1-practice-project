import isEqual from 'fast-deep-equal/es6/react';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'hooks';
import { ContestBox } from 'components/contest';
import { ItemsContainer, TryAgain } from 'components/general';
import { CREATOR } from 'constants/general';
import {
  clearContestsList,
  getContests,
  setNewCreatorFilter,
} from 'store/slices/contestsSlice';
import { getDataForContest } from 'store/slices/dataForContestSlice';
import type { GetActiveContestsParams } from 'types/contest';
import type { CreatorFilter as _CreatorFilter } from 'types/slices';
import { CreatorFilter } from './CreatorFilter';
import styles from './styles/CreatorDashboard.module.scss';

const CreatorDashboard = () => {
  const { contests, creatorFilter, error, haveMore } = useSelector(
    ({ contestsList }) => {
      const { contests, creatorFilter, error, haveMore } = contestsList;
      return { contests, creatorFilter, error, haveMore };
    },
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
      awardSort: searchParams.get('awardSort') ?? 'asc',
      contestId: searchParams.get('contestId') ?? '',
      industry: searchParams.get('industry') ?? '',
      ownEntries: searchParams.get('ownEntries') ?? false,
      typeIndex: searchParams.get('typeIndex') ?? '1',
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
  }, [searchParams, parseUrlForParams]);

  const contestsList = contests.map((contest) => (
    <ContestBox data={contest as any} key={contest.id} />
  ));

  const getPredicateOfRequest = useCallback(() => {
    const obj: typeof creatorFilter = {};
    for (const el in creatorFilter) {
      if (Object.hasOwn(creatorFilter, el)) {
        const value = creatorFilter[el as keyof typeof creatorFilter];
        // @ts-expect-error
        if (value != null) obj[el] = value;
      }
    }
    return obj;
  }, [creatorFilter]);

  const loadMore = useCallback(
    (startFrom: number) => {
      getContestsMethod({
        limit: 8,
        offset: startFrom,
        ...getPredicateOfRequest(),
      });
    },
    [getContestsMethod, getPredicateOfRequest],
  );

  const tryLoadAgain = useCallback(() => {
    dispatch(clearContestsList());
    loadMore(contests.length);
  }, [contests.length, loadMore, dispatch]);

  return (
    <main className={styles.mainContainer}>
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
    </main>
  );
};

export default CreatorDashboard;
