#!/usr/bin/env bash
docker run -p 27017:27017 -v $(pwd)/dbdata:/data/db \
-e MONGO_INITDB_ROOT_USERNAME=usernme \
-e MONGO_INITDB_ROOT_PASSWORD=simple \
--name mongo-eva \
--restart always mongo:latest