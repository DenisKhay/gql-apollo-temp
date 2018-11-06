FROM node:10.13.0-alpine

WORKDIR /app/

COPY ./server/ ./server/
COPY ./package*.json ./

RUN ls -al -R

ENV NODE_ENV=production

RUN npm i

RUN npm list -depth=0
RUN ls -al -R

EXPOSE 4000 27017

CMD [ "node", "server" ]