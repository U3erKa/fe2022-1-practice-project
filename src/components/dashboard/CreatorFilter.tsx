import clsx from 'clsx/lite';
import { useRouter } from 'next/navigation';
import { select } from 'radash';
import { type ChangeEventHandler, type FC, useCallback } from 'react';
import { useDispatch, useSelector } from 'hooks';
import { CONTEST_TYPES, PAGE } from 'constants/general';
import { setNewCreatorFilter } from 'store/slices/contestsSlice';
import type { Industry } from 'types/contest';
import styles from './styles/CreatorDashboard.module.scss';

export type Props = {
  readonly onChange: ChangeEventHandler<HTMLSelectElement>;
  readonly value: (typeof CONTEST_TYPES)[number];
};

export type Props2 = Pick<Props, 'onChange'> & {
  readonly industries?: Industry[];
  readonly filter?: Industry | '';
};

export const ContestTypes: FC<Props> = ({ onChange, value }) => {
  const contestTypes = select(
    CONTEST_TYPES,
    (type) => (
      <option key={type} value={type}>
        {type}
      </option>
    ),
    (_, i) => !!i,
  );

  return (
    <select className={styles.input} value={value} onChange={onChange}>
      {contestTypes}
    </select>
  );
};

export const IndustryType: FC<Props2> = ({ industries, filter, onChange }) => {
  const options = industries
    ? industries.map((industry) => (
        <option key={industry} value={industry}>
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
    <select className={styles.input} value={filter} onChange={onChange}>
      {options}
    </select>
  );
};

export const CreatorFilter = () => {
  const { creatorFilter, industry, isFetching } = useSelector(
    ({ contestsList, dataForContest }) => {
      const { creatorFilter } = contestsList;
      const { isFetching, data: contestData } = dataForContest;
      const { industry = [] } = contestData ?? {};
      return { creatorFilter, industry, isFetching };
    },
  );

  const dispatch = useDispatch();
  const router = useRouter();

  const changePredicate = useCallback(
    ({ name, value }: { name: string; value: boolean | number | string }) => {
      const newCreatorFilterValue = {
        [name]: value === 'Choose industry' ? null : value,
      };
      dispatch(setNewCreatorFilter(newCreatorFilterValue));
      const newCreatorFilter = { ...creatorFilter, ...newCreatorFilterValue };
      const params: typeof newCreatorFilter = {};

      for (const el in newCreatorFilter) {
        if (Object.hasOwn(newCreatorFilter, el)) {
          const value = newCreatorFilter[el as keyof typeof newCreatorFilter];
          // @ts-expect-error
          if (value != null) params[el] = value;
        }
      }

      router.push(`${PAGE.DASHBOARD}?${new URLSearchParams(params as any)}`);
    },
    [creatorFilter, dispatch, router],
  );

  const handleContestTypeChange: ChangeEventHandler<HTMLSelectElement> =
    useCallback(
      ({ target }) => {
        changePredicate({
          name: 'typeIndex',
          value: CONTEST_TYPES.indexOf(
            target.value as (typeof CONTEST_TYPES)[number],
          ),
        });
      },
      [changePredicate],
    );

  const handleIndustryTypeChange: ChangeEventHandler<HTMLSelectElement> =
    useCallback(
      ({ target }) => {
        changePredicate({
          name: 'industry',
          value: target.value,
        });
      },
      [changePredicate],
    );

  return (
    <div className={styles.filterContainer}>
      <span className={styles.headerFilter}>Filter Results</span>
      <div className={styles.inputsContainer}>
        <div
          className={clsx(
            styles.myEntries,
            creatorFilter.ownEntries && styles.activeMyEntries,
          )}
          onClick={() => {
            changePredicate({
              name: 'ownEntries',
              value: !creatorFilter.ownEntries,
            });
          }}
        >
          My Entries
        </div>
        <div className={styles.inputContainer}>
          <span>By contest type</span>
          <ContestTypes
            value={CONTEST_TYPES[creatorFilter.typeIndex as number]!}
            onChange={handleContestTypeChange}
          />
        </div>
        <div className={styles.inputContainer}>
          <span>By contest ID</span>
          <input
            className={styles.input}
            name="contestId"
            type="text"
            value={creatorFilter.contestId}
            onChange={({ target }) => {
              changePredicate({
                name: 'contestId',
                value: target.value,
              });
            }}
          />
        </div>
        {!isFetching && (
          <div className={styles.inputContainer}>
            <span>By industry</span>
            <IndustryType
              filter={creatorFilter.industry}
              industries={industry as Industry[]}
              onChange={handleIndustryTypeChange}
            />
          </div>
        )}
        <div className={styles.inputContainer}>
          <span>By amount award</span>
          <select
            className={styles.input}
            value={creatorFilter.awardSort}
            onChange={({ target }) => {
              changePredicate({
                name: 'awardSort',
                value: target.value,
              });
            }}
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </div>
      </div>
    </div>
  );
};
