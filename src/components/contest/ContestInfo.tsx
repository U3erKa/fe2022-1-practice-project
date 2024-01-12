import { faComments } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import isEqual from 'fast-deep-equal/es6/react';
import { type FC, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'hooks';
import {
  CONTEST_STATUS_FINISHED,
  CUSTOMER,
  NAME_CONTEST,
  PUBLIC_URL,
  TAGLINE_CONTEST,
} from 'constants/general';
import { goToExpandedDialog } from 'store/slices/chatSlice';
import type { InterlocutorId, UserId } from 'types/_common';
import type { ContestData } from 'types/slices';
import LogoContestSpecialInfo from './LogoContestSpecialInfo';
import NameContestSpecialInfo from './NameContestSpecialInfo';
import TaglineContestSpecialInfo from './TaglineContestSpecialInfo';
import styles from './styles/ContestInfo.module.scss';

export type Props = {
  readonly changeEditContest: (isEditContest: boolean) => void;
  readonly userId: UserId;
  readonly contestData: ContestData;
  readonly role: string;
};

type Props2 = {
  readonly label: string;
  readonly value: string;
};

function DataContainer({ label, value }: Props2) {
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
  const messagesPreview = useSelector(
    ({ chatStore }) => chatStore.messagesPreview,
  );
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

  const findConversationInfo = useCallback(
    (interlocutorId: InterlocutorId) => {
      const currentParticipants = [userId, interlocutorId].sort(
        (participant1, participant2) => participant1 - participant2,
      ) as [number, number];
      for (const preview of messagesPreview) {
        // @ts-expect-error
        const { _id, participants, blackList, favoriteList } = preview;
        if (isEqual(participants, currentParticipants)) {
          return { _id, blackList, favoriteList, participants };
        }
      }
      throw new Error(`Conversation info not found: ${currentParticipants}`);
    },
    [messagesPreview, userId],
  );

  const goChat = useCallback(() => {
    dispatch(
      goToExpandedDialog({
        conversationData: findConversationInfo(User.id),
        interlocutor: User,
      }),
    );
  }, [findConversationInfo, User, dispatch]);

  return (
    <div className={styles.mainContestInfoContainer}>
      <div className={styles.infoContainer}>
        <div className={styles.contestTypeContainer}>
          <DataContainer label="Contest Type" value={contestType} />
          {User.id === userId && status !== CONTEST_STATUS_FINISHED && (
            <div
              className={styles.editBtn}
              onClick={() => {
                changeEditContest(true);
              }}
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
            styleName={styleName!}
            typeOfName={typeOfName!}
          />
        ) : contestType === TAGLINE_CONTEST ? (
          <TaglineContestSpecialInfo
            nameVenture={nameVenture!}
            typeOfTagline={typeOfTagline!}
          />
        ) : (
          <LogoContestSpecialInfo
            brandStyle={brandStyle!}
            nameVenture={nameVenture!}
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
        {originalFileName ? (
          <div className={styles.dataContainer}>
            <span className={styles.label}>Additional File</span>
            <a
              className={styles.file}
              download={originalFileName}
              href={`${PUBLIC_URL}${fileName}`}
              rel="noreferrer"
              target="_blank"
            >
              {originalFileName}
            </a>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ContestInfo;
