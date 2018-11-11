#!/usr/bin/env bash
. ./.env
BACKUP_FOLDER="$(pwd)/backup";
HOST_ALIAS="mongoeva";
PORT="27017";

MONGO_COMMAND="mongodump \
--out /backup \
--host ${HOST_ALIAS} \
--port ${PORT} \
--username ${USERNAME} \
--password ${PASSWORD} \
--authenticationDatabase admin"

docker run --rm --network eva-network \
-v "${BACKUP_FOLDER}:/backup" \
mongo:latest bash -c "${MONGO_COMMAND}"