import { toast } from 'react-toastify';
import React from 'react';
import ChatSocket from './sockets/ChatSocket';
import NotificationSocket from './sockets/NotificationSocket';

export let controller;
export let chatController;

export const initSocket = store => {
  controller = new NotificationSocket(
    store.dispatch,
    store.getState,
    'notifications'
  );
  chatController = new ChatSocket(store.dispatch, store.getState, 'chat');
  return store;
};
