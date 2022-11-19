FROM node:16-alpine

ADD . /api

WORKDIR /api

RUN yarn install

CMD yarn dev

EXPOSE 4000
