require('dotenv').config();
const http = require('http');
const path = require('path');
const express = require('express');
const cors = require('cors');
require('./dbMongo/mongoose');
const router = require('./router');
const controller = require('./socketInit');
const handlerError = require('./handlerError/handler');
const tokenErrorHandler = require('./handlerError/tokenHandler');
const multerErrorHandler = require('./handlerError/multerHandler');
const { FILES_PATH } = require('./constants');

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
