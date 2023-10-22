import WebSocket from './WebSocket';
import { CHANGE_BLOCK_STATUS, NEW_MESSAGE } from '../../constants';
import type { Socket } from 'socket.io';

class ChatController extends WebSocket {
  anotherSubscribes(socket: Socket) {
    this.onSubscribeChat(socket);
    this.onUnsubscribeChat(socket);
  }

  onSubscribeChat(socket: Socket) {
    socket.on('subscribeChat', (id) => {
      socket.join(id);
    });
  }

  onUnsubscribeChat(socket: Socket) {
    socket.on('unsubscribeChat', (id) => {
      socket.join(id);
    });
  }

  emitNewMessage(target: string, message: string) {
    this.io
      .to(parseInt(target) as unknown as string)
      .emit(NEW_MESSAGE, { message });
  }

  emitChangeBlockStatus(target: string, message: string) {
    this.io
      .to(parseInt(target) as unknown as string)
      .emit(CHANGE_BLOCK_STATUS, { message });
  }
}

export default ChatController;
