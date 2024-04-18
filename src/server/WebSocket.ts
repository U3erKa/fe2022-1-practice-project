import type { Server, Socket } from 'socket.io';
import {
  CHANGE_BLOCK_STATUS,
  NEW_MESSAGE,
  NOTIFICATION_CHANGE_MARK,
  NOTIFICATION_CHANGE_OFFER_STATUS,
  NOTIFICATION_ENTRY_CREATED,
  SOCKET_CONNECTION,
  SOCKET_SUBSCRIBE,
  SOCKET_SUBSCRIBE_CHAT,
  SOCKET_UNSUBSCRIBE,
  SOCKET_UNSUBSCRIBE_CHAT,
} from 'constants/general';
import type { Conversation, Message, User } from 'types/models';

export type ChatControllerMessage = {
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

class WebSocket {
  // @ts-expect-error
  io: ReturnType<Server['of']>;
  connect(namespace: string | RegExp, io: Server) {
    this.io = io.of(namespace);

    this.io.on(SOCKET_CONNECTION, (socket) => {
      socket
        .on(SOCKET_SUBSCRIBE, (id: string | string[]) => socket.join(id))
        .on(SOCKET_UNSUBSCRIBE, (id: string) => socket.leave(id));
      this.anotherSubscribes(socket);
    });
  }

  // eslint-disable-next-line class-methods-use-this
  anotherSubscribes(socket: Socket) {}
}

export class ChatController extends WebSocket {
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

  emitNewMessage(target: number | string, message: ChatControllerMessage) {
    this.io.to(target as string).emit(NEW_MESSAGE, { message });
  }

  emitChangeBlockStatus(target: number | string, message: Conversation) {
    this.io.to(target as string).emit(CHANGE_BLOCK_STATUS, { message });
  }
}

export class NotificationController extends WebSocket {
  emitEntryCreated(target: string | string[]) {
    this.io.to(target).emit(NOTIFICATION_ENTRY_CREATED);
  }

  emitChangeMark(target: string | string[]) {
    this.io.to(target).emit(NOTIFICATION_CHANGE_MARK);
  }

  emitChangeOfferStatus(
    target: number | string,
    message: string,
    contestId: number,
  ) {
    this.io
      .to(target as string)
      .emit(NOTIFICATION_CHANGE_OFFER_STATUS, { contestId, message });
  }
}

export default WebSocket;
