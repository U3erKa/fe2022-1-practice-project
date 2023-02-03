const CONSTANTS = require('../../constants');

class WebSocket{
  connect (namespace, io) {
    this.io = io.of(namespace);
    this.listen();
  }

  listen () {
    this.io.on(CONSTANTS.SOCKET_CONNECTION, (socket) => {
      this.onSubscribe(socket);
      this.onUnsubscribe(socket);
      this.anotherSubscribes(socket);
    });
  }

  anotherSubscribes (socket) {

  }

  onSubscribe (socket) {
    socket.on(CONSTANTS.SOCKET_SUBSCRIBE, (id) => {
      socket.join(id);
    });
  }

  onUnsubscribe (socket) {
    socket.on(CONSTANTS.SOCKET_UNSUBSCRIBE, (id) => {
      socket.leave(id);
    });
  }
}

module.exports = WebSocket;
