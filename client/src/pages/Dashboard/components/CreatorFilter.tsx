import { type ChangeEventHandler, type FC } from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'hooks';
import { setNewCreatorFilter } from 'store/slices/contestsSlice';
import { ROUTE } from 'constants/general';
import type { Industry } from 'types/contest';
import type { CreatorFilter as _CreatorFilter } from 'types/slices';
import styles from '../styles/CreatorDashboard.module.sass';

export type Props = {
  onChange: ChangeEventHandler<HTMLSelectElement>;
  value: (typeof types)[number];
};

export const types = [
  '',
  'name,tagline,logo',
  'name',
  'tagline',
  'logo',
  'name,tagline',
  'logo,tagline',
  'name,logo',
];

export const ContestTypes: FC<Props> = ({ onChange, value }) => {
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

export type Props2 = Pick<Props, 'onChange'> & {
  industries?: Industry[];
  filter?: Industry | '';
};

export const IndustryType: FC<Props2> = ({ industries, filter, onChange }) => {
  const options = industries
    ? industries.map((industry, i) => (
        <option key={i + 1} value={industry}>
          {industry}
        </option>
      ))
    : [];

  options.unshift(
    <option key={0} value={''}>
      Choose industry
    </option>,
  );

  return (
    <select onChange={onChange} value={filter} className={styles.input}>
      {options}
    </select>
  );
};

export const CreatorFilter = () => {
  const { contestsList, dataForContest } = useSelector(
    ({ contestsList, dataForContest }) => ({ contestsList, dataForContest }),
  );

  const { creatorFilter } = contestsList;
  const { isFetching, data: contestData } = dataForContest;
  const { industry } = contestData || {};

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const parseParamsToUrl = (creatorFilter: _CreatorFilter) => {
    const obj: Record<string, any> = {};
    Object.keys(creatorFilter).forEach((el) => {
      if (creatorFilter[el as keyof _CreatorFilter]) {
        obj[el] = creatorFilter[el as keyof _CreatorFilter];
      }
    });

    navigate(`${ROUTE.DASHBOARD}?${new URLSearchParams(obj)}`);
  };

  const changePredicate = ({ name, value }: { name: string; value: any }) => {
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

  return (
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
          className={clsx(styles.myEntries, {
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
            value={types[creatorFilter.typeIndex as number]}
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
  );
};
