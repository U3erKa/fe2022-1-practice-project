import {
  faSquarePlus,
  faHeart as farFaHeart,
} from '@fortawesome/free-regular-svg-icons';
import {
  faCircleMinus,
  faUnlock,
  faUserLock,
  faHeart as fasFaHeart,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { type FC, type MouseEvent } from 'react';
import { UserImage } from 'components/general';
import { CATALOG_PREVIEW_CHAT_MODE, PUBLIC_URL } from 'constants/general';
import { getShortTimeStr } from 'utils/functions';
import type { ChatId, UserId } from 'types/api/_common';
import type { GoToExtendedDialog, Interlocutor } from 'types/api/chat';
import type { ChatMode, MessagePreview } from 'types/chat';
import styles from './styles/DialogBox.module.scss';

export type Props = {
  chatPreview: MessagePreview;
  userId: UserId;
  changeFavorite: (
    parameters: { participants: [UserId, UserId]; favoriteFlag: boolean },
    event: MouseEvent<SVGSVGElement>,
  ) => void;
  changeBlackList: (
    parameters: { participants: [UserId, UserId]; blackListFlag: boolean },
    event: MouseEvent<SVGSVGElement>,
  ) => void;
  catalogOperation: (event: MouseEvent<SVGSVGElement>, chatId: ChatId) => void;
  goToExpandedDialog: (data: GoToExtendedDialog) => void;
  chatMode: ChatMode;
  interlocutor: Interlocutor;
};

const DialogBox: FC<Props> = ({
  chatPreview,
  userId,
  changeFavorite,
  changeBlackList,
  catalogOperation,
  goToExpandedDialog,
  chatMode,
  interlocutor,
}) => {
  const { favoriteList, participants, blackList, _id, text, createdAt } =
    chatPreview;
  const isFavorite = favoriteList[participants.indexOf(userId)];
  const isBlocked = blackList[participants.indexOf(userId)];
  if (!interlocutor) return null;
  return (
    <div
      className={styles.previewChatBox}
      onClick={() =>
        goToExpandedDialog({
          conversationData: { _id, blackList, favoriteList, participants },
          interlocutor,
        })
      }
    >
      <UserImage src={`${PUBLIC_URL}${interlocutor.avatar}`} />
      <div className={styles.infoContainer}>
        <div className={styles.interlocutorInfo}>
          <span className={styles.interlocutorName}>
            {interlocutor.firstName}
          </span>
          <span className={styles.interlocutorMessage}>{text}</span>
        </div>
        <div className={styles.buttonsContainer}>
          <span className={styles.time}>{getShortTimeStr(createdAt)}</span>
          <FontAwesomeIcon
            icon={isFavorite ? fasFaHeart : farFaHeart}
            onClick={(event) =>
              changeFavorite({ favoriteFlag: !isFavorite, participants }, event)
            }
          />
          <FontAwesomeIcon
            icon={isBlocked ? faUnlock : faUserLock}
            onClick={(event) =>
              changeBlackList(
                { blackListFlag: !isBlocked, participants },
                event,
              )
            }
          />
          <FontAwesomeIcon
            icon={
              chatMode === CATALOG_PREVIEW_CHAT_MODE
                ? faCircleMinus
                : faSquarePlus
            }
            onClick={(event) => catalogOperation(event, _id)}
          />
        </div>
      </div>
    </div>
  );
};

export default DialogBox;
