import { faHeart as farFaHeart } from '@fortawesome/free-regular-svg-icons';
import {
  faUnlock,
  faUserLock,
  faHeart as fasFaHeart,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import { type FC, type MouseEventHandler, useCallback } from 'react';
import { useDispatch, useSelector } from 'hooks';
import { UserImage } from 'components/general';
import { PUBLIC_URL } from 'constants/general';
import {
  backToDialogList,
  changeChatBlock,
  changeChatFavorite,
} from 'store/slices/chatSlice';
import LeftArrowIcon from 'assets/icons/arrow-left-thick.png';
import type { UserId } from 'types/_common';
import type { ChatData } from 'types/chat';
import styles from './styles/ChatHeader.module.scss';

export type Props = {
  readonly userId: UserId;
};

const isFavorite = (chatData: ChatData, userId: UserId) => {
  const { favoriteList, participants } = chatData;
  return favoriteList[participants.indexOf(userId)];
};

const isBlocked = (chatData: ChatData, userId: UserId) => {
  const { participants, blackList } = chatData;
  return blackList[participants.indexOf(userId)];
};

const ChatHeader: FC<Props> = ({ userId }) => {
  const { chatData, avatar, firstName } = useSelector(({ chatStore }) => {
    const { chatData, interlocutor } = chatStore;
    const { avatar, firstName } = interlocutor ?? {};
    return { chatData, avatar, firstName };
  });
  const { participants } = chatData ?? {};
  const dispatch = useDispatch();

  const handleChangeFavorite: MouseEventHandler<SVGSVGElement> = useCallback(
    (event) => {
      dispatch(
        changeChatFavorite({
          participants,
          favoriteFlag: !isFavorite(chatData, userId),
        }),
      );
      event.stopPropagation();
    },
    [userId, chatData, participants, dispatch],
  );

  const handleChangeBlock: MouseEventHandler<SVGSVGElement> = useCallback(
    (event) => {
      dispatch(
        changeChatBlock({
          participants,
          blackListFlag: !isBlocked(chatData, userId),
        }),
      );
      event.stopPropagation();
    },
    [userId, chatData, participants, dispatch],
  );

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
              onClick={handleChangeFavorite}
            />
            <FontAwesomeIcon
              icon={isBlocked(chatData, userId) ? faUnlock : faUserLock}
              onClick={handleChangeBlock}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ChatHeader;
