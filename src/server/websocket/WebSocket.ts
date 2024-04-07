import type { Server, Socket } from 'socket.io';
import {
  SOCKET_CONNECTION,
  SOCKET_SUBSCRIBE,
  SOCKET_UNSUBSCRIBE,
} from 'constants/general';

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

export default WebSocket;
