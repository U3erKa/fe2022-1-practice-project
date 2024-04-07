import socketIoClient from 'socket.io-client';
import type { AppDispatch, reduxStore } from 'store';
import { NEXT_PUBLIC_WS_SERVER_URL } from 'constants/general';

class WebSocket {
  socket: ReturnType<typeof socketIoClient>;
  constructor(
    public dispatch: AppDispatch,
    public getState: (typeof reduxStore)['getState'],
    room: string,
  ) {
    this.socket = socketIoClient(`${NEXT_PUBLIC_WS_SERVER_URL}/${room}`, {
      // @ts-expect-error
      origins: 'localhost:*',
      transports: ['websocket', 'polling'],
    });

    this.socket.on('connect', () => {
      this.anotherSubscribes();
    });
  }

  // eslint-disable-next-line class-methods-use-this
  anotherSubscribes() {}
}

export default WebSocket;
