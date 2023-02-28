import socketIoClient from 'socket.io-client';

import { BASE_URL } from 'constants/general';
import type { AppDispatch, RootState } from 'store';

class WebSocket {
  socket: ReturnType<typeof socketIoClient>;
  constructor(
    public dispatch: AppDispatch,
    public getState: RootState,
    room: string,
  ) {
    this.socket = socketIoClient(`${BASE_URL}${room}`, {
      // @ts-expect-error
      origins: 'localhost:*',
    });
    this.listen();
  }

  listen = () => {
    this.socket.on('connect', () => {
      this.anotherSubscribes();
    });
  };

  anotherSubscribes = () => {};
}

export default WebSocket;
