import type { Socket } from 'socket.io';
import {
  CHANGE_BLOCK_STATUS,
  NEW_MESSAGE,
  SOCKET_SUBSCRIBE_CHAT,
  SOCKET_UNSUBSCRIBE_CHAT,
} from 'constants/general';
import type { Conversation, Message, User } from 'types/models';
import WebSocket from './WebSocket';

export type WebSocketMessage = {
  message: Message;
  preview: Pick<Message, '_id' | 'sender' | 'createdAt'> &
    Pick<Conversation, 'blackList' | 'favoriteList'> & {
      text: Message['body'];
      participants: [User['id'], User['id']];
      interlocutor: Pick<
        User,
        'id' | 'firstName' | 'lastName' | 'displayName' | 'avatar' | 'email'
      >;
    };
};

class ChatController extends WebSocket {
  anotherSubscribes(socket: Socket) {
    this.onSubscribeChat(socket);
    this.onUnsubscribeChat(socket);
  }

  onSubscribeChat(socket: Socket) {
    socket.on(SOCKET_SUBSCRIBE_CHAT, (id) => {
      socket.join(id);
    });
  }

  onUnsubscribeChat(socket: Socket) {
    socket.on(SOCKET_UNSUBSCRIBE_CHAT, (id) => {
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
