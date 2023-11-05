import { useDispatch, useSelector } from 'hooks';
import {
  clearContestUpdationStore,
  updateContest,
} from 'store/slices/contestUpdationSlice';
import { changeEditContest } from 'store/slices/contestByIdSlice';
import { Error } from 'components/general';
import { ContestForm, ContestInfo } from 'components/contest';
import type { ContestInfo as _ContestInfo } from 'types/api/contest';
import type { ContestData } from 'types/slices';
import styles from '../styles/Brief.module.scss';

const Brief = () => {
  const selector = useSelector((state) => {
    const { contestUpdationStore, userStore, contestByIdStore } = state;
    return { contestUpdationStore, userStore, contestByIdStore };
  });
  const dispatch = useDispatch();

  const {
    contestByIdStore: { isEditContest, contestData },
    contestUpdationStore: { error },
    userStore: { data: user },
  } = selector;

  const setNewContestData = (values: _ContestInfo) => {
    const data = new FormData();

    Object.keys(values).forEach((key) => {
      if (key !== 'file' && values[key as keyof _ContestInfo])
        data.append(key, values[key as keyof _ContestInfo]!);
    });
    if (values.file instanceof File) {
      data.append('file', values.file);
    }
    data.append('contestId', contestData!.id as unknown as string);

    dispatch(updateContest(data));
  };

  const getContestObjInfo = () => {
    type DefaultData = Omit<typeof data, 'originalFileName'> & {
      file: {
        name: typeof data.originalFileName;
      };
    };

    const {
      focusOfWork,
      industry,
      nameVenture,
      styleName,
      targetCustomer,
      title,
      brandStyle,
      typeOfName,
      typeOfTagline,
      originalFileName,
      contestType,
    } = contestData ?? ({} as ContestData);
    const data = {
      focusOfWork,
      industry,
      nameVenture,
      styleName,
      targetCustomer,
      title,
      brandStyle,
      typeOfName,
      typeOfTagline,
      originalFileName,
      contestType,
    };

    const defaultData = {} as DefaultData;
    Object.keys(data).forEach((key) => {
      if (data[key as keyof typeof data]) {
        if (key === 'originalFileName') {
          defaultData.file = { name: data[key] };
        } else {
          // @ts-expect-error
          defaultData[key] = data[key as keyof typeof data];
        }
      }
    });
    return defaultData;
  };

  if (!contestData || !user) {
    return null;
  }
  const { id: userId, role } = user;

  if (!isEditContest) {
    return (
      <ContestInfo
        userId={userId}
        contestData={contestData}
        changeEditContest={(data) => dispatch(changeEditContest(data))}
        role={role}
      />
    );
  }
  return (
    <div className={styles.contestForm}>
      {error && (
        <Error
          data={error.data}
          status={error.status}
          clearError={() => dispatch(clearContestUpdationStore())}
        />
      )}
      <ContestForm
        contestType={contestData.contestType}
        defaultData={getContestObjInfo() as unknown as _ContestInfo}
        handleSubmit={setNewContestData}
      />
    </div>
  );
};

export default Brief;
