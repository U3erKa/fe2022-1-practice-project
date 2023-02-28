import { useDispatch, useSelector } from 'hooks';
import {
  clearContestUpdationStore,
  updateContest,
} from 'store/slices/contestUpdationSlice';
import { changeEditContest } from 'store/slices/contestByIdSlice';

import { Error } from 'components/general';
import { ContestForm, ContestInfo } from 'components/contest';

import styles from '../styles/Brief.module.sass';

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
  const { id: userId, role } = user ?? {};

  const setNewContestData = (values) => {
    const data = new FormData();

    Object.keys(values).forEach((key) => {
      if (key !== 'file' && values[key]) data.append(key, values[key]);
    });
    if (values.file instanceof File) {
      data.append('file', values.file);
    }
    data.append('contestId', contestData.id);

    dispatch(updateContest(data));
  };

  const getContestObjInfo = () => {
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
    } = contestData ?? {};
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

    const defaultData = {};
    Object.keys(data).forEach((key) => {
      if (data[key]) {
        if (key === 'originalFileName') {
          defaultData.file = { name: data[key] };
        } else {
          defaultData[key] = data[key];
        }
      }
    });
    return defaultData;
  };

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
        defaultData={getContestObjInfo()}
        handleSubmit={setNewContestData}
      />
    </div>
  );
};

export default Brief;
