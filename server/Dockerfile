FROM node:18-alpine

ARG NODE_ENV="development"

RUN mkdir /server \
    && mkdir -p /public/images \
    && mkdir -p /var/www/html/images 

WORKDIR /server

COPY . .

RUN npm install -g sequelize-cli nodemon

RUN npm install

RUN chown -R node:node /server/node_modules \
    && chown -R node:node /var/www/html/images \
    && chown -R node:node /public

EXPOSE 3000

CMD sequelize db:migrate && sequelize db:seed:all && npm start