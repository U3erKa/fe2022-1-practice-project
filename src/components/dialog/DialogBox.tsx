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
import {
  type FC,
  type MouseEvent,
  type MouseEventHandler,
  useCallback,
} from 'react';
import { UserImage } from 'components/general';
import { CATALOG_PREVIEW_CHAT_MODE, PUBLIC_URL } from 'constants/general';
import { getShortTimeStr } from 'utils/functions';
import type { ChatId, UserId } from 'types/api/_common';
import type { GoToExtendedDialog, Interlocutor } from 'types/api/chat';
import type { ChatMode, MessagePreview } from 'types/chat';
import styles from './styles/DialogBox.module.scss';

export type Props = {
  readonly chatPreview: MessagePreview;
  readonly userId: UserId;
  readonly changeFavorite: (
    parameters: { participants: [UserId, UserId]; favoriteFlag: boolean },
    event: MouseEvent<SVGSVGElement>,
  ) => void;
  readonly changeBlackList: (
    parameters: { participants: [UserId, UserId]; blackListFlag: boolean },
    event: MouseEvent<SVGSVGElement>,
  ) => void;
  readonly catalogOperation: (
    event: MouseEvent<SVGSVGElement>,
    chatId: ChatId,
  ) => void;
  readonly goToExpandedDialog: (data: GoToExtendedDialog) => void;
  readonly chatMode: ChatMode;
  readonly interlocutor: Interlocutor;
};

const DialogBox: FC<Props> = ({
  catalogOperation,
  changeBlackList,
  changeFavorite,
  chatMode,
  chatPreview,
  goToExpandedDialog,
  interlocutor,
  userId,
}) => {
  const { favoriteList, participants, blackList, _id, text, createdAt } =
    chatPreview;
  const isFavorite = favoriteList[participants.indexOf(userId)];
  const isBlocked = blackList[participants.indexOf(userId)];

  const handleChangeFavorite: MouseEventHandler<SVGSVGElement> = useCallback(
    (event) =>
      changeFavorite({ favoriteFlag: !isFavorite, participants }, event),
    [isFavorite, participants, changeFavorite],
  );

  const handleChangeBlock: MouseEventHandler<SVGSVGElement> = useCallback(
    (event) =>
      changeBlackList({ blackListFlag: !isBlocked, participants }, event),
    [isBlocked, participants, changeBlackList],
  );

  const handleChangeChatMode: MouseEventHandler<SVGSVGElement> = useCallback(
    (event) => catalogOperation(event, _id),
    [_id, catalogOperation],
  );

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
            onClick={handleChangeFavorite}
          />
          <FontAwesomeIcon
            icon={isBlocked ? faUnlock : faUserLock}
            onClick={handleChangeBlock}
          />
          <FontAwesomeIcon
            icon={
              chatMode === CATALOG_PREVIEW_CHAT_MODE
                ? faCircleMinus
                : faSquarePlus
            }
            onClick={handleChangeChatMode}
          />
        </div>
      </div>
    </div>
  );
};

export default DialogBox;
