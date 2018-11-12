FROM node:10.13.0-alpine

WORKDIR /app/

COPY ./server/ ./server/

COPY ./package*.json ./
ENV NODE_ENV=production

RUN ls -al -R
RUN npm i && mv -f ./server/environment/index.prod.js ./server/environment/index.js
RUN npm list -depth=0

EXPOSE 4000

CMD [ "npm", "run", "start:debug" ]