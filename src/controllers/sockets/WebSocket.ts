import {
  SOCKET_CONNECTION,
  SOCKET_SUBSCRIBE,
  SOCKET_UNSUBSCRIBE,
} from 'constants/general';
import type { Server, Socket } from 'socket.io';

class WebSocket {
  // @ts-expect-error
  io: ReturnType<Server['of']>;
  connect(namespace: string | RegExp, io: Server) {
    this.io = io.of(namespace);
    this.listen();
  }

  listen() {
    this.io.on(SOCKET_CONNECTION, (socket) => {
      this.onSubscribe(socket);
      this.onUnsubscribe(socket);
      this.anotherSubscribes(socket);
    });
  }

  anotherSubscribes(socket: Socket) {}

  onSubscribe(socket: Socket) {
    socket.on(SOCKET_SUBSCRIBE, (id) => {
      socket.join(id);
    });
  }

  onUnsubscribe(socket: Socket) {
    socket.on(SOCKET_UNSUBSCRIBE, (id) => {
      socket.leave(id);
    });
  }
}

export default WebSocket;
