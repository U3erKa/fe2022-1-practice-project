require('dotenv').config();
import http from 'http';
import path from 'path';
import express from 'express';
import cors from 'cors';
require('./dbMongo/mongoose');
import router from './router';
import * as controller from './socketInit';
import handlerError from './handlerError/handler';
import tokenErrorHandler from './handlerError/tokenHandler';
import multerErrorHandler from './handlerError/multerHandler';
import { FILES_PATH } from './constants';

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use('/public', express.static(path.join(FILES_PATH)));
app.use(router);
app.use(tokenErrorHandler);
app.use(multerErrorHandler);
app.use(handlerError);

const server = http.createServer(app);
server.listen(PORT, () =>
  console.log(`Example app listening on port ${PORT}!`),
);
controller.createConnection(server);
