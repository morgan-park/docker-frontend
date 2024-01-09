FROM node:14-slim

WORKDIR /src/app

COPY ./package.json ./

COPY ./package-lock.json ./

RUN npm install
RUN npm install react-scripts --save-dev

COPY . . /src/app/

EXPOSE 3000

CMD ["npm", "start"]