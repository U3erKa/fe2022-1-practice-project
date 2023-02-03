FROM node:16.15.1-alpine3.16 as build-stage

ARG NODE_ENV="production"

RUN mkdir ./client

WORKDIR ./client

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:1.13.12-alpine as production-stage

RUN mkdir -p /var/www/html/

COPY --from=build-stage /client/build /var/www/html/

COPY ./nginx.conf /etc/nginx/nginx.conf

COPY ./nginx.vh.default.conf /etc/nginx/nginx.vh.default.conf

STOPSIGNAL SIGTERM

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
