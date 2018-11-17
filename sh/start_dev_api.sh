#!/usr/bin/env bash

docker stop eva-api
docker rm -f eva-api
docker rmi -f evaapi:latest

docker build -t evaapi .
docker run  -p 8087:4000 \
--env-file .env-dev \
--name eva-api \
--volume $(pwd)/logs:/app/logs \
--network host \
evaapi