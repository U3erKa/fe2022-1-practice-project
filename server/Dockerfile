FROM node:16.15.1-alpine3.16

ARG NODE_ENV="development"

RUN mkdir /server \
    && mkdir -p /public/images

RUN mkdir -p /var/www/html/images 

WORKDIR /server

COPY package*.json ./

RUN npm install -g nodemon
RUN npm install -g sequelize-cli

RUN npm install

RUN chown -R node:node /server/node_modules

COPY . .

EXPOSE 3000

CMD sequelize db:migrate && sequelize db:seed:all && npm start