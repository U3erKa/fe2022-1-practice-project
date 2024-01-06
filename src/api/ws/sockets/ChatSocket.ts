import {
  CHANGE_BLOCK_STATUS,
  NEW_MESSAGE,
  SOCKET_SUBSCRIBE_CHAT,
  SOCKET_UNSUBSCRIBE_CHAT,
} from 'constants/general';
import { addMessage, changeBlockStatusInStore } from 'store/slices/chatSlice';
import type { ChatId } from 'types/_common';
import WebSocket from './WebSocket';

class ChatSocket extends WebSocket {
  anotherSubscribes() {
    this.socket
      .on(NEW_MESSAGE, (data) => {
        this.dispatch(addMessage(data.message));
      })
      .on(CHANGE_BLOCK_STATUS, (data) => {
        this.dispatch(changeBlockStatusInStore(data.message));
      });
  }

  subscribe(id: ChatId) {
    this.socket.emit(SOCKET_SUBSCRIBE_CHAT, id);
  }

  unsubscribe(id: ChatId) {
    this.socket.emit(SOCKET_UNSUBSCRIBE_CHAT, id);
  }
}

export default ChatSocket;
