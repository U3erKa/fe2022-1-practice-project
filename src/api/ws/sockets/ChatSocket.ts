import WebSocket from './WebSocket';
import { addMessage, changeBlockStatusInStore } from 'store/slices/chatSlice';
import {
  CHANGE_BLOCK_STATUS,
  NEW_MESSAGE,
  SOCKET_SUBSCRIBE_CHAT,
  SOCKET_UNSUBSCRIBE_CHAT,
} from 'constants/general';
import type { ChatId } from 'types/api/_common';

class ChatSocket extends WebSocket {
  anotherSubscribes = () => {
    this.onNewMessage();
    this.onChangeBlockStatus();
  };

  onChangeBlockStatus = () => {
    this.socket.on(CHANGE_BLOCK_STATUS, (data) => {
      this.dispatch(changeBlockStatusInStore(data.message));
    });
  };

  onNewMessage = () => {
    this.socket.on(NEW_MESSAGE, (data) => {
      this.dispatch(addMessage(data.message));
    });
  };

  subscribeChat = (id: ChatId) => {
    this.socket.emit(SOCKET_SUBSCRIBE_CHAT, id);
  };

  unsubscribeChat = (id: ChatId) => {
    this.socket.emit(SOCKET_UNSUBSCRIBE_CHAT, id);
  };
}

export default ChatSocket;
