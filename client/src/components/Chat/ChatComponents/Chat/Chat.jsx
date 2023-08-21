import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import {
  changeChatShow,
  setPreviewChatMode,
  changeShowModeCatalog,
  clearChatError,
  getPreviewChat,
} from 'store/slices/chatSlice';
import { chatController } from 'api/ws/socketController';

import {
  CatalogCreation,
  CatalogListContainer,
  CatalogListHeader,
  ChatError,
  Dialog,
  DialogListContainer,
} from 'components/Chat';

import {
  BLOCKED_PREVIEW_CHAT_MODE,
  CATALOG_PREVIEW_CHAT_MODE,
  FAVORITE_PREVIEW_CHAT_MODE,
  NORMAL_PREVIEW_CHAT_MODE,
  STATIC_IMAGES_PATH,
} from 'constants/general';

import styles from './Chat.module.sass';

class Chat extends React.Component {
  componentDidMount() {
    chatController.subscribeChat(this.props.userStore.data.id);
    this.props.getPreviewChat();
  }

  componentWillUnmount() {
    chatController.unsubscribeChat(this.props.userStore.data.id);
  }

  renderDialogList = () => {
    const { setChatPreviewMode } = this.props;
    const { chatMode, isShowChatsInCatalog } = this.props.chatStore;
    const { id } = this.props.userStore.data;

    return (
      <div>
        {isShowChatsInCatalog && <CatalogListHeader />}
        {!isShowChatsInCatalog && (
          <div className={styles.chatHeader}>
            <img src={`${STATIC_IMAGES_PATH}logo.png`} alt="logo" />
          </div>
        )}
        {!isShowChatsInCatalog && (
          <div className={styles.buttonsContainer}>
            <span
              onClick={() => setChatPreviewMode(NORMAL_PREVIEW_CHAT_MODE)}
              className={classNames(styles.button, {
                [styles.activeButton]: chatMode === NORMAL_PREVIEW_CHAT_MODE,
              })}
            >
              Normal
            </span>
            <span
              onClick={() => setChatPreviewMode(FAVORITE_PREVIEW_CHAT_MODE)}
              className={classNames(styles.button, {
                [styles.activeButton]: chatMode === FAVORITE_PREVIEW_CHAT_MODE,
              })}
            >
              Favorite
            </span>
            <span
              onClick={() => setChatPreviewMode(BLOCKED_PREVIEW_CHAT_MODE)}
              className={classNames(styles.button, {
                [styles.activeButton]: chatMode === BLOCKED_PREVIEW_CHAT_MODE,
              })}
            >
              Blocked
            </span>
            <span
              onClick={() => setChatPreviewMode(CATALOG_PREVIEW_CHAT_MODE)}
              className={classNames(styles.button, {
                [styles.activeButton]: chatMode === CATALOG_PREVIEW_CHAT_MODE,
              })}
            >
              Catalog
            </span>
          </div>
        )}
        {chatMode === CATALOG_PREVIEW_CHAT_MODE ? (
          <CatalogListContainer />
        ) : (
          <DialogListContainer userId={id} />
        )}
      </div>
    );
  };

  render() {
    const { isExpanded, isShow, isShowCatalogCreation, error } =
      this.props.chatStore;
    const { id } = this.props.userStore.data;
    const { changeShow, getPreviewChat } = this.props;
    return (
      <div
        className={classNames(styles.chatContainer, {
          [styles.showChat]: isShow,
        })}
      >
        {error && <ChatError getData={getPreviewChat} />}
        {isShowCatalogCreation && <CatalogCreation />}
        {isExpanded ? <Dialog userId={id} /> : this.renderDialogList()}
        <div className={styles.toggleChat} onClick={() => changeShow()}>
          {isShow ? 'Hide Chat' : 'Show Chat'}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { chatStore, userStore } = state;
  return { chatStore, userStore };
};

const mapDispatchToProps = (dispatch) => ({
  changeShow: () => dispatch(changeChatShow()),
  setChatPreviewMode: (mode) => dispatch(setPreviewChatMode(mode)),
  changeShowModeCatalog: () => dispatch(changeShowModeCatalog()),
  clearChatError: () => dispatch(clearChatError()),
  getPreviewChat: () => dispatch(getPreviewChat()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
