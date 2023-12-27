import { faHeart as farFaHeart } from '@fortawesome/free-regular-svg-icons';
import {
  faUnlock,
  faUserLock,
  faHeart as fasFaHeart,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import { type FC, type MouseEvent } from 'react';
import { useDispatch, useSelector } from 'hooks';
import { UserImage } from 'components/general';
import { PUBLIC_URL } from 'constants/general';
import {
  backToDialogList,
  changeChatBlock,
  changeChatFavorite,
} from 'store/slices/chatSlice';
import LeftArrowIcon from 'assets/icons/arrow-left-thick.png';
import type { UserId } from 'types/api/_common';
import type {
  ChangeChatBlockParams,
  ChangeChatFavoriteParams,
} from 'types/api/chat';
import type { ChatData } from 'types/chat';
import styles from './styles/ChatHeader.module.scss';

export type Props = {
  readonly userId: UserId;
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
        <Image alt="back" src={LeftArrowIcon} />
      </div>
      <div className={styles.infoContainer}>
        <div>
          <UserImage src={`${PUBLIC_URL}${avatar}`} />
          <span>{firstName}</span>
        </div>
        {chatData ? (
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
        ) : null}
      </div>
    </div>
  );
};

export default ChatHeader;
