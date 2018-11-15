#!/usr/bin/env bash

. ./.env-dev

docker network create eva-network
docker rm -f eva-mongo
docker run \
-p 27017:27017 \
-v $(pwd)/dbdata:/data/db \
--name eva-mongo \
--network eva-network \
-e "MONGO_INITDB_ROOT_USERNAME=${DB_USERNAME}" \
-e "MONGO_INITDB_ROOT_PASSWORD=${DB_PASSWORD}" \
--network-alias evamongo mongo:latest