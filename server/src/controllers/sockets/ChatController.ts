import WebSocket from './WebSocket';
import { CHANGE_BLOCK_STATUS, NEW_MESSAGE } from '../../constants';
import type { Socket } from 'socket.io';
import type { Conversation } from '../../types/models';
import type { WebSocketMessage } from '../../types/websocket';

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

  emitNewMessage(target: number | string, message: WebSocketMessage) {
    this.io.to(target as string).emit(NEW_MESSAGE, { message });
  }

  emitChangeBlockStatus(target: number | string, message: Conversation) {
    this.io.to(target as string).emit(CHANGE_BLOCK_STATUS, { message });
  }
}

export default ChatController;
