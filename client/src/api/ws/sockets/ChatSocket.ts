import WebSocket from './WebSocket';
import { addMessage, changeBlockStatusInStore } from 'store/slices/chatSlice';
import { CHANGE_BLOCK_STATUS } from 'constants/general';
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
    this.socket.on('newMessage', (data) => {
      this.dispatch(addMessage(data.message));
    });
  };

  subscribeChat = (id: ChatId) => {
    this.socket.emit('subscribeChat', id);
  };

  unsubscribeChat = (id: ChatId) => {
    this.socket.emit('unsubscribeChat', id);
  };
}

export default ChatSocket;
