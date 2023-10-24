import socketIoClient from 'socket.io-client';

import { BASE_URL } from 'constants/general';
import type { AppDispatch, default as store } from 'store';

class WebSocket {
  socket: ReturnType<typeof socketIoClient>;
  constructor(
    public dispatch: AppDispatch,
    public getState: (typeof store)['getState'],
    room: string,
  ) {
    this.socket = socketIoClient(`${BASE_URL}${room}`, {
      // @ts-expect-error
      origins: 'localhost:*',
      transports: ['websocket', 'polling'],
    });
    this.listen();
  }

  listen = () => {
    this.socket.on('connect', () => {
      this.anotherSubscribes();
    });
  };

  // eslint-disable-next-line class-methods-use-this
  anotherSubscribes = () => {};
}

export default WebSocket;
