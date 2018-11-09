FROM node:10.13.0-alpine

WORKDIR /app/

COPY ./server/ ./server/
COPY ./package*.json ./
ENV NODE_ENV=production

RUN ls -al -R
RUN npm i
RUN npm list -depth=0
RUN ls -al -R

EXPOSE 4000

CMD [ "npm", "run", "start:debug" ]