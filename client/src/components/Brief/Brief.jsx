import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import {
  clearContestUpdationStore,
  updateContest,
} from 'store/slices/contestUpdationSlice';
import { changeEditContest } from 'store/slices/contestByIdSlice';

import { Error } from 'components';
import { ContestForm, ContestInfo } from 'components/Contest';

import styles from './Brief.module.sass';

const Brief = (props) => {
  const setNewContestData = (values) => {
    const data = new FormData();
    Object.keys(values).forEach((key) => {
      if (key !== 'file' && values[key]) data.append(key, values[key]);
    });
    if (values.file instanceof File) {
      data.append('file', values.file);
    }
    data.append('contestId', props.contestData.id);
    props.update(data);
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
    } = props.contestData;
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

  const {
    isEditContest,
    contestData,
    changeEditContest,
    role,
    goChat,
    clearContestUpdationStore,
  } = props;
  const { error } = props.contestUpdationStore;
  const { id } = props.userStore.data;
  if (!isEditContest) {
    return (
      <ContestInfo
        userId={id}
        contestData={contestData}
        changeEditContest={changeEditContest}
        role={role}
        goChat={goChat}
      />
    );
  }
  return (
    <div className={styles.contestForm}>
      {error && (
        <Error
          data={error.data}
          status={error.status}
          clearError={clearContestUpdationStore}
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

const mapStateToProps = (state) => {
  const { isEditContest } = state.contestByIdStore;
  const { contestUpdationStore, userStore } = state;
  return { contestUpdationStore, userStore, isEditContest };
};

const mapDispatchToProps = (dispatch) => ({
  update: (data) => dispatch(updateContest(data)),
  changeEditContest: (data) => dispatch(changeEditContest(data)),
  clearContestUpdationStore: () => dispatch(clearContestUpdationStore()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Brief));
