FROM node:16.16.0

WORKDIR /server

COPY package.json /server//package.json

RUN yarn

COPY . /server

CMD ["yarn", "start"]