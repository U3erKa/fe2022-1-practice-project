import type { RootStore } from 'store';
import ChatSocket from './sockets/ChatSocket';
import NotificationSocket from './sockets/NotificationSocket';

export let controller: NotificationSocket;
export let chatController: ChatSocket;

export const initSocket = (store: RootStore) => {
  controller = new NotificationSocket(
    store.dispatch,
    store.getState,
    'notifications',
  );
  chatController = new ChatSocket(store.dispatch, store.getState, 'chat');
  return store;
};
