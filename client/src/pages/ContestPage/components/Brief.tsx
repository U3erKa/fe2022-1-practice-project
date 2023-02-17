import { useDispatch, useSelector } from 'react-redux';
import { isEqual } from 'lodash';

import {
  clearContestUpdationStore,
  updateContest,
} from 'store/slices/contestUpdationSlice';
import { changeEditContest } from 'store/slices/contestByIdSlice';
import { goToExpandedDialog } from 'store/slices/chatSlice';

import { Error } from 'components/general';
import { ContestForm, ContestInfo } from 'components/contest';

import styles from '../styles/Brief.module.sass';

const Brief = () => {
  const selector = useSelector((state) => {
    const { contestUpdationStore, userStore, chatStore, contestByIdStore } =
      state;
    return { contestUpdationStore, userStore, contestByIdStore, chatStore };
  });
  const dispatch = useDispatch();

  const {
    contestByIdStore: { isEditContest, contestData },
    contestUpdationStore: { error },
    userStore: {
      data: { id: userId, role },
    },
    chatStore: { messagesPreview },
  } = selector;

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
    } = contestData;
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

  const findConversationInfo = (interlocutorId) => {
    const participants = [userId, interlocutorId];
    participants.sort(
      (participant1, participant2) => participant1 - participant2,
    );
    for (let i = 0; i < messagesPreview.length; i++) {
      if (isEqual(participants, messagesPreview[i].participants)) {
        return {
          participants: messagesPreview[i].participants,
          _id: messagesPreview[i]._id,
          blackList: messagesPreview[i].blackList,
          favoriteList: messagesPreview[i].favoriteList,
        };
      }
    }
    return null;
  };

  const goChat = () => {
    const { User } = contestData;
    dispatch(
      goToExpandedDialog({
        interlocutor: User,
        conversationData: findConversationInfo(User.id),
      }),
    );
  };

  if (!isEditContest) {
    return (
      <ContestInfo
        userId={userId}
        contestData={contestData}
        changeEditContest={(data) => dispatch(changeEditContest(data))}
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
