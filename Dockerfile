FROM node:16

WORKDIR /karuru/
COPY ./package.json /karuru/
COPY ./yarn.lock /karuru/
RUN yarn install

COPY . /karuru/
RUN yarn build

CMD yarn start:prod