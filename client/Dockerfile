FROM node:18-alpine

ARG NODE_ENV="development"

RUN mkdir -p ./client

WORKDIR /client

COPY . .

EXPOSE 5173

RUN npm install

RUN chown -R node:node /client/node_modules

CMD npm start
