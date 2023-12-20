import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { select } from 'radash';
import { type ChangeEventHandler, type FC } from 'react';
import { useDispatch, useSelector } from 'store';
import { CONTEST_TYPES, PAGE } from 'constants/general';
import { setNewCreatorFilter } from 'store/slices/contestsSlice';
import type { Industry } from 'types/contest';
import type { CreatorFilter as _CreatorFilter } from 'types/slices';
import styles from './styles/CreatorDashboard.module.scss';

export type Props = {
  onChange: ChangeEventHandler<HTMLSelectElement>;
  value: (typeof CONTEST_TYPES)[number];
};

export const ContestTypes: FC<Props> = ({ onChange, value }) => {
  const contestTypes = select(
    CONTEST_TYPES,
    (type, i) => (
      <option key={i} value={type}>
        {type}
      </option>
    ),
    (_, i) => !!i,
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
  const router = useRouter();

  const parseParamsToUrl = (creatorFilter: _CreatorFilter) => {
    const obj: Record<string, any> = {};
    for (const el in creatorFilter) {
      if (Object.hasOwn(creatorFilter, el)) {
        const value = creatorFilter[el as keyof typeof creatorFilter];
        if (value != null) obj[el] = value;
      }
    }

    router.push(`${PAGE.DASHBOARD}?${new URLSearchParams(obj)}`);
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
                value: CONTEST_TYPES.indexOf(target.value),
              })
            }
            value={CONTEST_TYPES[creatorFilter.typeIndex as number]}
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
