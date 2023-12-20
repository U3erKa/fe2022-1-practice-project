import { faHeart as farFaHeart } from '@fortawesome/free-regular-svg-icons';
import {
  faUnlock,
  faUserLock,
  faHeart as fasFaHeart,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { type FC, type MouseEvent } from 'react';
import { useDispatch, useSelector } from 'hooks';
import { Picture } from 'components/general';
import {
  ANONYM_IMAGE_NAME,
  ANONYM_IMAGE_PATH,
  PUBLIC_URL,
  STATIC_IMAGES_PATH,
} from 'constants/general';
import {
  backToDialogList,
  changeChatBlock,
  changeChatFavorite,
} from 'store/slices/chatSlice';
import type { UserId } from 'types/api/_common';
import type {
  ChangeChatBlockParams,
  ChangeChatFavoriteParams,
} from 'types/api/chat';
import type { ChatData } from 'types/chat';
import styles from './styles/ChatHeader.module.scss';

export type Props = {
  userId: UserId;
};

const ChatHeader: FC<Props> = ({ userId }) => {
  const { interlocutor, chatData } = useSelector(({ chatStore }) => chatStore);
  const dispatch = useDispatch();

  const { avatar, firstName } = interlocutor || {};

  const changeFavorite = (
    data: ChangeChatFavoriteParams,
    event: MouseEvent<SVGSVGElement>,
  ) => {
    dispatch(changeChatFavorite(data));
    event.stopPropagation();
  };

  const changeBlackList = (
    data: ChangeChatBlockParams,
    event: MouseEvent<SVGSVGElement>,
  ) => {
    dispatch(changeChatBlock(data));
    event.stopPropagation();
  };

  const isFavorite = (chatData: ChatData, userId: UserId) => {
    const { favoriteList, participants } = chatData;
    return favoriteList[participants.indexOf(userId)];
  };

  const isBlocked = (chatData: ChatData, userId: UserId) => {
    const { participants, blackList } = chatData;
    return blackList[participants.indexOf(userId)];
  };

  return (
    <div className={styles.chatHeader}>
      <div
        className={styles.buttonContainer}
        onClick={() => dispatch(backToDialogList())}
      >
        <Picture
          srcSet={[
            `${STATIC_IMAGES_PATH}arrow-left-thick.avif`,
            `${STATIC_IMAGES_PATH}arrow-left-thick.webp`,
          ]}
          src={`${STATIC_IMAGES_PATH}arrow-left-thick.png`}
          alt="back"
        />
      </div>
      <div className={styles.infoContainer}>
        <div>
          <img
            src={
              avatar === ANONYM_IMAGE_NAME
                ? ANONYM_IMAGE_PATH
                : `${PUBLIC_URL}${avatar}`
            }
            alt="user"
          />
          <span>{firstName}</span>
        </div>
        {chatData && (
          <div>
            <FontAwesomeIcon
              icon={isFavorite(chatData, userId) ? fasFaHeart : farFaHeart}
              onClick={(event) =>
                changeFavorite(
                  {
                    participants: chatData.participants,
                    favoriteFlag: !isFavorite(chatData, userId),
                  },
                  event,
                )
              }
            />
            <FontAwesomeIcon
              icon={isBlocked(chatData, userId) ? faUnlock : faUserLock}
              onClick={(event) =>
                changeBlackList(
                  {
                    participants: chatData.participants,
                    blackListFlag: !isBlocked(chatData, userId),
                  },
                  event,
                )
              }
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatHeader;
