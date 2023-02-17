import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import classNames from 'classnames';
import isEqual from 'lodash/isEqual';

import { useDispatch, useSelector } from 'hooks';
import {
  getContests,
  clearContestsList,
  setNewCreatorFilter,
} from 'store/slices/contestsSlice';
import { getDataForContest } from 'store/slices/dataForContestSlice';

import { TryAgain } from 'components/general';
import { ContestsContainer, ContestBox } from 'components/contest';

import { CREATOR } from 'constants/general';
import styles from '../styles/CreatorDashboard.module.sass';

const types = [
  '',
  'name,tagline,logo',
  'name',
  'tagline',
  'logo',
  'name,tagline',
  'logo,tagline',
  'name,logo',
];

const IndustryType = ({ industries, filter, onChange }) => {
  const options = industries
    ? industries.map((industry, i) => (
        <option key={i + 1} value={industry}>
          {industry}
        </option>
      ))
    : [];

  options.unshift(
    <option key={0} value={null}>
      Choose industry
    </option>,
  );

  return (
    <select onChange={onChange} value={filter} className={styles.input}>
      {options}
    </select>
  );
};

const ContestList = ({ contests, goToExtended }) => {
  return contests.map((contest) => (
    <ContestBox key={contest.id} data={contest} goToExtended={goToExtended} />
  ));
};

const ContestTypes = ({ onChange, value }) => {
  const contestTypes = types.map(
    (type, i) =>
      !i || (
        <option key={i - 1} value={type}>
          {type}
        </option>
      ),
  );

  return (
    <select onChange={onChange} value={value} className={styles.input}>
      {contestTypes}
    </select>
  );
};

const CreatorDashboard = () => {
  const { contestsList, dataForContest } = useSelector(
    ({ contestsList, dataForContest }) => ({ contestsList, dataForContest }),
  );
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { contests, creatorFilter, error, haveMore } = contestsList;
  const { industry } = dataForContest.data || {};

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

  const getContestsMethod = (filter) => {
    dispatch(
      getContests({
        requestData: { limit: 8, offset: 0, ...filter },
        role: CREATOR,
      }),
    );
  };

  const changePredicate = ({ name, value }) => {
    dispatch(
      setNewCreatorFilter({
        [name]: value === 'Choose industry' ? null : value,
      }),
    );
    parseParamsToUrl({
      ...creatorFilter,
      ...{ [name]: value === 'Choose industry' ? null : value },
    });
  };

  const parseParamsToUrl = (creatorFilter) => {
    const obj = {};
    Object.keys(creatorFilter).forEach((el) => {
      if (creatorFilter[el]) obj[el] = creatorFilter[el];
    });

    navigate(`/Dashboard?${queryString.stringify(obj)})`);
  };

  const parseUrlForParams = (search) => {
    const obj = queryString.parse(search);
    const filter = {
      typeIndex: obj.typeIndex || 1,
      contestId: obj.contestId ? obj.contestId : '',
      industry: obj.industry ? obj.industry : '',
      awardSort: obj.awardSort || 'asc',
      ownEntries:
        typeof obj.ownEntries === 'undefined' ? false : obj.ownEntries,
    };
    if (!isEqual(filter, creatorFilter)) {
      dispatch(setNewCreatorFilter(filter));
      dispatch(clearContestsList());
      getContestsMethod(filter);
      return false;
    }
    return true;
  };

  const getPredicateOfRequest = () => {
    const obj = {};
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

  const goToExtended = (contestId) => {
    navigate(`/contest/${contestId}`);
  };

  const tryLoadAgain = () => {
    dispatch(clearContestsList());
    getContestsMethod({
      limit: 8,
      offset: 0,
      ...getPredicateOfRequest(),
    });
  };

  const { isFetching } = dataForContest;

  return (
    <div className={styles.mainContainer}>
      <div className={styles.filterContainer}>
        <span className={styles.headerFilter}>Filter Results</span>
        <div className={styles.inputsContainer}>
          <div
            onClick={() =>
              changePredicate({
                name: 'ownEntries',
                value: !creatorFilter.ownEntries,
              })
            }
            className={classNames(styles.myEntries, {
              [styles.activeMyEntries]: creatorFilter.ownEntries,
            })}
          >
            My Entries
          </div>
          <div className={styles.inputContainer}>
            <span>By contest type</span>
            <ContestTypes
              onChange={({ target }) =>
                changePredicate({
                  name: 'typeIndex',
                  value: types.indexOf(target.value),
                })
              }
              value={types[creatorFilter.typeIndex]}
            />
          </div>
          <div className={styles.inputContainer}>
            <span>By contest ID</span>
            <input
              type="text"
              onChange={({ target }) =>
                changePredicate({
                  name: 'contestId',
                  value: target.value,
                })
              }
              name="contestId"
              value={creatorFilter.contestId}
              className={styles.input}
            />
          </div>
          {!isFetching && (
            <div className={styles.inputContainer}>
              <span>By industry</span>
              <IndustryType
                industries={industry}
                filter={creatorFilter.industry}
                onChange={({ target }) =>
                  changePredicate({
                    name: 'industry',
                    value: target.value,
                  })
                }
              />
            </div>
          )}
          <div className={styles.inputContainer}>
            <span>By amount award</span>
            <select
              onChange={({ target }) =>
                changePredicate({
                  name: 'awardSort',
                  value: target.value,
                })
              }
              value={creatorFilter.awardSort}
              className={styles.input}
            >
              <option value="desc">Descending</option>
              <option value="asc">Ascending</option>
            </select>
          </div>
        </div>
      </div>
      {error ? (
        <div className={styles.messageContainer}>
          <TryAgain getData={tryLoadAgain} />
        </div>
      ) : (
        <ContestsContainer
          isFetching={isFetching}
          loadMore={loadMore}
          haveMore={haveMore}
        >
          <ContestList contests={contests} goToExtended={goToExtended} />
        </ContestsContainer>
      )}
    </div>
  );
};

export default CreatorDashboard;
