import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import {
  backToDialogList,
  changeChatFavorite,
  changeChatBlock,
} from '../../../../store/slices/chatSlice';
import styles from './ChatHeader.module.sass';
import {
  STATIC_IMAGES_PATH,
  ANONYM_IMAGE_PATH,
  PUBLIC_URL,
} from '../../../../constants';

const ChatHeader = (props) => {
  const changeFavorite = (data, event) => {
    props.changeChatFavorite(data);
    event.stopPropagation();
  };

  const changeBlackList = (data, event) => {
    props.changeChatBlock(data);
    event.stopPropagation();
  };

  const isFavorite = (chatData, userId) => {
    const { favoriteList, participants } = chatData;
    return favoriteList[participants.indexOf(userId)];
  };

  const isBlocked = (chatData, userId) => {
    const { participants, blackList } = chatData;
    return blackList[participants.indexOf(userId)];
  };

  const { avatar, firstName } = props.interlocutor;
  const { backToDialogList, chatData, userId } = props;
  return (
    <div className={styles.chatHeader}>
      <div
        className={styles.buttonContainer}
        onClick={() => backToDialogList()}
      >
        <img src={`${STATIC_IMAGES_PATH}arrow-left-thick.png`} alt="back" />
      </div>
      <div className={styles.infoContainer}>
        <div>
          <img
            src={
              avatar === 'anon.png'
                ? ANONYM_IMAGE_PATH
                : `${PUBLIC_URL}${avatar}`
            }
            alt="user"
          />
          <span>{firstName}</span>
        </div>
        {chatData && (
          <div>
            <i
              onClick={(event) =>
                changeFavorite(
                  {
                    participants: chatData.participants,
                    favoriteFlag: !isFavorite(chatData, userId),
                  },
                  event,
                )
              }
              className={classNames({
                'far fa-heart': !isFavorite(chatData, userId),
                'fas fa-heart': isFavorite(chatData, userId),
              })}
            />
            <i
              onClick={(event) =>
                changeBlackList(
                  {
                    participants: chatData.participants,
                    blackListFlag: !isBlocked(chatData, userId),
                  },
                  event,
                )
              }
              className={classNames({
                'fas fa-user-lock': !isBlocked(chatData, userId),
                'fas fa-unlock': isBlocked(chatData, userId),
              })}
            />
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { interlocutor, chatData } = state.chatStore;
  return { interlocutor, chatData };
};

const mapDispatchToProps = (dispatch) => ({
  backToDialogList: () => dispatch(backToDialogList()),
  changeChatFavorite: (data) => dispatch(changeChatFavorite(data)),
  changeChatBlock: (data) => dispatch(changeChatBlock(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatHeader);
