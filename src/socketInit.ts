import type http from 'http';
import { Server, type ServerOptions } from 'socket.io';
import ChatController from './controllers/sockets/ChatController';
import NotificationController from './controllers/sockets/NotificationController';

let notificationController: NotificationController;
let chatController: ChatController;

const options = {
  cors: { origin: '*' },
  transports: ['websocket', 'polling'],
} as const satisfies Partial<ServerOptions>;

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
