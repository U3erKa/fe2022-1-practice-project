import socketIoClient from 'socket.io-client';
import type { AppDispatch, reduxStore } from 'store';
import { BASE_URL } from 'constants/general';

class WebSocket {
  socket: ReturnType<typeof socketIoClient>;
  constructor(
    public dispatch: AppDispatch,
    public getState: (typeof reduxStore)['getState'],
    room: string,
  ) {
    this.socket = socketIoClient(`${BASE_URL}${room}`, {
      // @ts-expect-error
      origins: 'localhost:*',
      transports: ['websocket', 'polling'],
    });

    this.socket.on('connect', () => {
      this.anotherSubscribes();
    });
  }

  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-empty-function
  anotherSubscribes() {}
}

export default WebSocket;
