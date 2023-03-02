import {
  SOCKET_CONNECTION,
  SOCKET_SUBSCRIBE,
  SOCKET_UNSUBSCRIBE,
} from '../../constants';

class WebSocket {
  connect(namespace, io) {
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

  anotherSubscribes(socket) {}

  onSubscribe(socket) {
    socket.on(SOCKET_SUBSCRIBE, (id) => {
      socket.join(id);
    });
  }

  onUnsubscribe(socket) {
    socket.on(SOCKET_UNSUBSCRIBE, (id) => {
      socket.leave(id);
    });
  }
}

export default WebSocket;
