FROM node:10.13.0-alpine

WORKDIR /app/

COPY . .

RUN ls -al -R

ENV NODE_ENV=production
RUN npm i

RUN ls -al -R

EXPOSE 4000

CMD [ "node", "server" ]