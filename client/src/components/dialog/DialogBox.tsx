import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleMinus,
  faUnlock,
  faUserLock,
  faHeart as fasFaHeart,
} from '@fortawesome/free-solid-svg-icons';
import {
  faSquarePlus,
  faHeart as farFaHeart,
} from '@fortawesome/free-regular-svg-icons';
import {
  ANONYM_IMAGE_PATH,
  CATALOG_PREVIEW_CHAT_MODE,
  PUBLIC_URL,
} from 'constants/general';
import styles from './styles/DialogBox.module.sass';

const DialogBox = (props) => {
  const {
    chatPreview,
    userId,
    getTimeStr,
    changeFavorite,
    changeBlackList,
    catalogOperation,
    goToExpandedDialog,
    chatMode,
    interlocutor,
  } = props;
  const { favoriteList, participants, blackList, _id, text, createdAt } =
    chatPreview;
  const isFavorite = favoriteList[participants.indexOf(userId)];
  const isBlocked = blackList[participants.indexOf(userId)];
  return (
    <div
      className={styles.previewChatBox}
      onClick={() =>
        goToExpandedDialog({
          interlocutor,
          conversationData: {
            participants,
            _id,
            blackList,
            favoriteList,
          },
        })
      }
    >
      <img
        src={
          interlocutor.avatar === 'anon.png'
            ? ANONYM_IMAGE_PATH
            : `${PUBLIC_URL}${interlocutor.avatar}`
        }
        alt="user"
      />
      <div className={styles.infoContainer}>
        <div className={styles.interlocutorInfo}>
          <span className={styles.interlocutorName}>
            {interlocutor.firstName}
          </span>
          <span className={styles.interlocutorMessage}>{text}</span>
        </div>
        <div className={styles.buttonsContainer}>
          <span className={styles.time}>{getTimeStr(createdAt)}</span>
          <FontAwesomeIcon
            icon={isFavorite ? fasFaHeart : farFaHeart}
            onClick={(event) =>
              changeFavorite(
                {
                  participants,
                  favoriteFlag: !isFavorite,
                },
                event,
              )
            }
          />
          <FontAwesomeIcon
            icon={isBlocked ? faUnlock : faUserLock}
            onClick={(event) =>
              changeBlackList(
                {
                  participants,
                  blackListFlag: !isBlocked,
                },
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
