FROM node:18

USER root

RUN npm config set cache /tmp --global

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3001

CMD ["npm", "run", "start"]