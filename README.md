### GraphQL + Express + Mongoose

For quick start just use it
```bash
docker run -p 27017:27017 -v $(pwd)/dbdata:/data/db --name mongo-eva --restart always -d mongo:latest
```

### Before proceed i need to know:

1. How to backup db data? In case of mongodb in docker container, need backup on hot db.
      * Restore of db after full loss of data (current is corrupted, stolen, etc. )
      * Tools for everyday backup of db. Wanted result is a script for automatic everyday backup.
      * The way of restore data should be at least documented and tested. Better - script for automatic restore.
      
      
2. How to make confident secure access to db?
    * need I set up db user/password in case if mongo does not have opened ports/adresses outside?
    
    
    
#### Backup:

```bash
BACKUP_FOLDER="$(pwd)/backup/"
docker run --rm --link mongo-eva:mongo -v "${BACKUP_FOLDER}:/backup" mongo:latest bash -c "mongodump --out /backup --host mongo:27017"
```

#### Restore:

```bash
BACKUP_FOLDER="$(pwd)/backup/"
docker run --rm --link mongo-eva:mongo -v "${BACKUP_FOLDER}:/backup" mongo:latest bash -c "mongorestore /backup --host mongo:27017"
```
