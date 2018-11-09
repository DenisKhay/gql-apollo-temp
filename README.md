### GraphQL + Express + Mongoose (It is rather log than readme) 

For quick start just use it
```bash
docker run -p 27017:27017 -v $(pwd)/dbdata:/data/db \
--name mongo-eva \
--restart always -d mongo:latest
```

### Before proceed I need to know:

1. How to backup db data? In case of mongodb in docker container, need backup on hot db.
      * Restore of db after full loss of data (current is corrupted, stolen, etc. )
      * Tools for everyday backup of db. Wanted result is a script for automatic everyday backup.
      * The way of restore data should be at least documented and tested. Better - script for automatic restore.
      
      
2. How to make confident secure access to db?
    * need I set up db user/password in case if mongo does not have opened ports/adresses outside?
    
    
    
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
mongo:latest bash -c "mongorestore /backup --host mongo-als:27017"
```

Next steps is rather simple - just plan with cron to run this backup string as script & pack it with some archiver & send to some place by some things.
So for now - it is not so important to setup. Postponed to deploy preparation stage.
We can also easily restore the data with existing backup using ssh connection and last command above


#### TODO:

1. Setup run of two containers with docker-compose. Purpose is to make only api endpoint visible outside.
2. User access? Think about it.


#### TODO 2:
 1. First of previous todo is done. But still I believe I need setup admin login/password
 2. Need to know how to make container names more appropriate with docker-compose? 
 container_name, yes, but seems there is some caveats.. Check it. Do it.
 3. Need to rework approach for to making backups using networks, not links.
 4. Awaiter of mongodb!!!
 4. User roles/access.
 
 
#### TODO 2 Implementation
 1. Okay, lets go
 First of all we should add .env file (and sure forthwith to add it to .gitignore) 
 Where we should define our super login and super password (for db admin).  
 Then add required env vars to our docker-compose
