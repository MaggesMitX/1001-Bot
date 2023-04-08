FROM node:18

USER root

RUN npm config set cache /tmp --global

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install
RUN npm run database-generate

COPY . .

EXPOSE 3001

CMD ["npm", "run", "start"]
