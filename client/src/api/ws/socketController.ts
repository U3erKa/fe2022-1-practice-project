import ChatSocket from './sockets/ChatSocket';
import NotificationSocket from './sockets/NotificationSocket';
import type _store from 'store';

export let controller: NotificationSocket;
export let chatController: ChatSocket;

export const initSocket = (store: typeof _store) => {
  controller = new NotificationSocket(
    store.dispatch,
    store.getState,
    'notifications',
  );
  chatController = new ChatSocket(store.dispatch, store.getState, 'chat');
  return store;
};
