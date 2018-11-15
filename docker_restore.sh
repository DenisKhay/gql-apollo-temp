#!/usr/bin/env bash
. ./.env
BACKUP_FOLDER="$(pwd)/backup";

PORT="27017";
NETWORK_NAME="eva-network";
NETWORK_CONTAINER_ALIAS="evamongo";

MONGO_COMMAND="mongorestore /backup \
--host ${NETWORK_CONTAINER_ALIAS} \
--port ${PORT} \
--username ${DB_USERNAME} \
--password ${DB_PASSWORD} \
--authenticationDatabase admin"

docker run --rm --network ${NETWORK_NAME} -v "${BACKUP_FOLDER}:/backup" mongo:latest bash -c "${MONGO_COMMAND}"