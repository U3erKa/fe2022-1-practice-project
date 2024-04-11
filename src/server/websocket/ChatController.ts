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
  preview: Pick<Conversation, 'blackList' | 'favoriteList'> &
    Pick<Message, '_id' | 'createdAt' | 'sender'> & {
      text: Message['body'];
      participants: [User['id'], User['id']];
      interlocutor: Pick<
        User,
        'avatar' | 'displayName' | 'email' | 'firstName' | 'id' | 'lastName'
      >;
    };
};

class ChatController extends WebSocket {
  // eslint-disable-next-line class-methods-use-this
  anotherSubscribes(socket: Socket) {
    socket
      .on(SOCKET_SUBSCRIBE_CHAT, (id: string | string[]) => {
        return socket.join(id);
      })
      .on(SOCKET_UNSUBSCRIBE_CHAT, (id: string) => {
        return socket.leave(id);
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
