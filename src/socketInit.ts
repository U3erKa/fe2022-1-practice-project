import { Server } from 'socket.io';
import ChatController from './controllers/sockets/ChatController';
import NotificationController from './controllers/sockets/NotificationController';
import type http from 'http';
import type { ServerOptions } from 'socket.io';

let notificationController: NotificationController;
let chatController: ChatController;

const options: Partial<ServerOptions> = {
  cors: { origin: '*' },
  transports: ['websocket', 'polling'],
};

export const createConnection = (httpServer: http.Server) => {
  const io = new Server(httpServer, options);
  notificationController = new NotificationController();
  notificationController.connect('/notifications', io);
  chatController = new ChatController();
  chatController.connect('/chat', io);
};

export const getChatController = () => {
  return chatController;
};

export const getNotificationController = () => {
  return notificationController;
};
