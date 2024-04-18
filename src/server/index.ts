import 'dotenv/config';
import http from 'http';
import { Server } from 'socket.io';
// @ts-expect-error
import cors from 'cors';
import express, { type ErrorRequestHandler } from 'express';
import { saveErrorToLog } from 'logger';
import router from 'server/router';
import { ChatController, NotificationController } from 'server/WebSocket';

const PORT = +(process.env.PORT ?? 3000) + 1;
const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

app.use(((err, req, res, next) => {
  saveErrorToLog(err);
  if (!err.message || !err.code) return res.status(500).send('Server Error');
  res.status(err.code).send(err.message);
}) as ErrorRequestHandler);

const server = http.createServer(app);
server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`WebSocket server is listening on port ${PORT}`);
});

const io = new Server(server, {
  cors: { origin: '*' },
  transports: ['websocket', 'polling'],
});

export const notificationController = new NotificationController();
export const chatController = new ChatController();
notificationController.connect('/notifications', io);
chatController.connect('/chat', io);
