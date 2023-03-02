import { Server } from 'socket.io';
import ChatController from './controllers/sockets/ChatController';
import NotificationController from './controllers/sockets/NotificationController';

let notificationController;
let chatController;

const cors = {
  origin: '*',
};

export const createConnection = (httpServer) => {
  const io = new Server(httpServer, { cors });
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
