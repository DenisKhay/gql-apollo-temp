### GraphQL + Express + Mongoose (It is rather log than readme) 

For quick start just use it
```bash
docker run -p 27017:27017 -v $(pwd)/dbdata:/data/db --name eva-mongo --restart always mongo:latest
```
    
#### Backup:

```bash
BACKUP_FOLDER="$(pwd)/backup/"
docker run --rm --link mongo-eva:mongo-als \
-v "${BACKUP_FOLDER}:/backup" \
mongo:latest bash -c "mongodump --out /backup --host mongo-als:27017"
```

#### Restore:

```bash
BACKUP_FOLDER="$(pwd)/backup/"
docker run --rm --link mongo-eva:mongo-als \
-v "${BACKUP_FOLDER}:/backup" \
mongo:latest bash -c "\mongorestore /backup \--host mongo-als --port 27017 --username usernme --password simple --authenticationDatabase admin"

```

**All my fight with configs and etc. you can see in ROAD_TO_HELL.md :)**



