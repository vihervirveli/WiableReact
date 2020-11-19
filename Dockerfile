FROM node:12

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8081
VOLUME /react/sivu

CMD ["npm","start"]