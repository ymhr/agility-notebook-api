FROM node:latest

RUN npm install -g nodemon

RUN mkdir /src

WORKDIR /src

ADD package.json package.json

RUN npm install

EXPOSE 3000

CMD npm run dev
