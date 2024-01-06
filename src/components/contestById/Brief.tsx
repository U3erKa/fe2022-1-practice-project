import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'hooks';
import { ContestForm, ContestInfo } from 'components/contest';
import { Error } from 'components/general';
import { changeEditContest } from 'store/slices/contestByIdSlice';
import {
  clearContestUpdationStore,
  updateContest,
} from 'store/slices/contestUpdationSlice';
import type { ContestInfo as _ContestInfo } from 'types/api/contest';
import type { ContestData } from 'types/slices';
import styles from './styles/Brief.module.scss';

const Brief = () => {
  const { contestData, isEditContest, error, user } = useSelector((state) => {
    const { contestByIdStore, contestUpdationStore, userStore } = state;
    const { contestData, isEditContest } = contestByIdStore;
    const { error } = contestUpdationStore;
    const { data: user } = userStore;
    return { contestData, isEditContest, error, user };
  });
  const dispatch = useDispatch();

  const defaultData = useMemo(() => {
    type DefaultData = Omit<typeof data, 'originalFileName'> & {
      file: {
        name: typeof data.originalFileName;
      };
    };

    const {
      brandStyle,
      contestType,
      focusOfWork,
      industry,
      nameVenture,
      originalFileName,
      styleName,
      targetCustomer,
      title,
      typeOfName,
      typeOfTagline,
    } = contestData ?? ({} as ContestData);
    const data = {
      brandStyle,
      contestType,
      focusOfWork,
      industry,
      nameVenture,
      originalFileName,
      styleName,
      targetCustomer,
      title,
      typeOfName,
      typeOfTagline,
    };

    const defaultData = {} as DefaultData;
    for (const key in data) {
      if (Object.hasOwn(data, key)) {
        const element = data[key as keyof typeof data];
        if (key === 'originalFileName') {
          defaultData.file = { name: data[key] };
        } else {
          // @ts-expect-error
          defaultData[key] = element;
        }
      }
    }
    return defaultData;
  }, [contestData]);

  const setNewContestData = useCallback(
    (values: _ContestInfo) => {
      const data = new FormData();

      for (const key in values) {
        if (Object.hasOwn(values, key)) {
          const value = values[key as keyof typeof values];
          if ((key !== 'file' && value) ?? value instanceof File) {
            data.append(key, value);
          }
        }
      }

      data.append('contestId', contestData!.id as unknown as string);

      dispatch(updateContest(data));
    },
    [contestData, dispatch],
  );

  const handleChangeEditContest = useCallback(
    (data: boolean) => dispatch(changeEditContest(data)),
    [dispatch],
  );

  const handleClearError = useCallback(
    () => dispatch(clearContestUpdationStore()),
    [dispatch],
  );

  if (!contestData || !user) {
    return null;
  }
  const { id: userId, role } = user;

  if (!isEditContest) {
    return (
      <ContestInfo
        changeEditContest={handleChangeEditContest}
        contestData={contestData}
        role={role}
        userId={userId}
      />
    );
  }

  return (
    <div className={styles.contestForm}>
      {error ? (
        <Error
          clearError={handleClearError}
          data={error.data}
          status={error.status}
        />
      ) : null}
      <ContestForm
        contestType={contestData.contestType}
        defaultData={defaultData}
        handleSubmit={setNewContestData}
      />
    </div>
  );
};

export default Brief;
