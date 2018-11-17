FROM node:10.13.0-alpine

WORKDIR /app/

COPY ./server/ ./server/

COPY ./package*.json ./
COPY ./forever/production.json ./forever/production.json


ENV NODE_ENV=production

RUN ls -al -R
RUN npm ci
RUN npm list -depth=0

EXPOSE 4000

CMD [ "npm", "start" ]