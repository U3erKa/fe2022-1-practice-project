import { useDispatch } from 'react-redux';
import { isEqual } from 'radash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import LogoContestSpecialInfo from './LogoContestSpecialInfo';
import NameContestSpecialInfo from './NameContestSpecialInfo';
import TaglineContestSpecialInfo from './TaglineContestSpecialInfo';
import { useSelector } from 'hooks';
import { goToExpandedDialog } from 'store/slices/chatSlice';
import {
  CONTEST_STATUS_FINISHED,
  CUSTOMER,
  NAME_CONTEST,
  PUBLIC_URL,
  TAGLINE_CONTEST,
} from 'constants/general';
import type { InterlocutorId, UserId } from 'types/api/_common';
import styles from './styles/ContestInfo.module.scss';
import type { FC } from 'react';
import type { ContestData } from 'types/slices';
import type { LogoContest, NameContest, TaglineContest } from 'types/contest';

export type Props = {
  changeEditContest: (isEditContest: boolean) => void;
  userId: UserId;
  contestData: ContestData;
  role: string;
};

function DataContainer({ label, value }: { label: string; value: string }) {
  return (
    <div className={styles.dataContainer}>
      <span className={styles.label}>{label}</span>
      <span className={styles.data}>{value}</span>
    </div>
  );
}

const ContestInfo: FC<Props> = ({
  changeEditContest,
  userId,
  contestData,
  role,
}) => {
  const { messagesPreview } = useSelector((state) => state.chatStore);
  const dispatch = useDispatch();

  const {
    typeOfTagline,
    brandStyle,
    typeOfName,
    styleName,
    contestType,
    title,
    focusOfWork,
    targetCustomer,
    industry,
    nameVenture,
    originalFileName,
    fileName,
    User,
    status,
  } = contestData;

  const findConversationInfo = (interlocutorId: InterlocutorId) => {
    const currentParticipants = [userId, interlocutorId].sort(
      (participant1, participant2) => participant1 - participant2,
    );
    for (let i = 0; i < messagesPreview.length; i++) {
      const { _id, participants, blackList, favoriteList } = messagesPreview[i];
      if (isEqual(currentParticipants, participants)) {
        return { _id, participants, blackList, favoriteList };
      }
    }
    throw new Error(`Conversation info not found: ${currentParticipants}`);
  };

  const goChat = () => {
    dispatch(
      goToExpandedDialog({
        interlocutor: User,
        conversationData: findConversationInfo(User.id),
      }),
    );
  };

  return (
    <div className={styles.mainContestInfoContainer}>
      <div className={styles.infoContainer}>
        <div className={styles.contestTypeContainer}>
          <DataContainer label="Contest Type" value={contestType} />
          {User.id === userId && status !== CONTEST_STATUS_FINISHED && (
            <div
              onClick={() => changeEditContest(true)}
              className={styles.editBtn}
            >
              Edit
            </div>
          )}
          {role !== CUSTOMER && (
            <FontAwesomeIcon icon={faComments} onClick={goChat} />
          )}
        </div>
        <DataContainer label="Title of the Project" value={title} />
        {contestType === NAME_CONTEST ? (
          <NameContestSpecialInfo
            typeOfName={typeOfName as NameContest['typeOfName']}
            styleName={styleName as NameContest['styleName']}
          />
        ) : contestType === TAGLINE_CONTEST ? (
          <TaglineContestSpecialInfo
            typeOfTagline={typeOfTagline as TaglineContest['typeOfTagline']}
            nameVenture={nameVenture as TaglineContest['nameVenture']}
          />
        ) : (
          <LogoContestSpecialInfo
            brandStyle={brandStyle as LogoContest['brandStyle']}
            nameVenture={nameVenture as LogoContest['nameVenture']}
          />
        )}
        <DataContainer
          label="What is your Business/ Brand about?"
          value={focusOfWork}
        />
        <DataContainer
          label="Description target customers of company"
          value={targetCustomer}
        />
        <DataContainer label="Industry of company" value={industry} />
        {originalFileName && (
          <div className={styles.dataContainer}>
            <span className={styles.label}>Additional File</span>
            <a
              target="_blank"
              className={styles.file}
              href={`${PUBLIC_URL}${fileName}`}
              download={originalFileName}
              rel="noreferrer"
            >
              {originalFileName}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContestInfo;