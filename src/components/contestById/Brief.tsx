import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'hooks';
import { ContestForm, ContestInfo } from 'components/contest';
import { Error } from 'components/general';
import { changeEditContest } from 'store/slices/contestByIdSlice';
import { clearContestUpdationStore } from 'store/slices/contestUpdationSlice';
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
          data={(error as any).data}
          status={(error as any).status}
        />
      ) : null}
      <ContestForm contestType={contestData.contestType} />
    </div>
  );
};

export default Brief;
