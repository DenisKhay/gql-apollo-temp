### GraphQL + Express + Mongoose (It is rather log than readme) 

No - I'm just kidding, it is not road to hell and not description of it, 
just the dock where i try to describe my way through issues which i have to solve 
on the way to ideal (or close to it, or at least appropriate) configuration.

### So first before proceed I need to know:

1. How to backup db data? In case of mongodb in docker container, need backup on hot db.
      * Restore of db after full loss of data (current is corrupted, stolen, etc. )
      * Tools for everyday backup of db. Wanted result is a script for automatic everyday backup.
      * The way of restore data should be at least documented and tested. Better - script for automatic restore.
      
      
2. How to make confident secure access to db?
    * need I set up db user/password in case if mongo does not have opened ports/adresses outside?
    

#### Solving

Okay, I put down some lines to readme file and i think it solves these two above.


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
 2. Okay, configured it in the docker-compose, all works okay with custom names of network and containers.
 3. I think it should be something similar to 

```bash
HOST_ALIAS="mongoeva";
PORT="27017";
USERNAME="<db username here>";
PASSWORD="<db password here>";

MONGO_COMMAND="mongodump --out /backup --host ${HOST_ALIAS} --port ${PORT} --username ${USERNAME} --password ${PASSWORD} --authenticationDatabase admin"
docker run --rm --network eva-network \
-v "${BACKUP_FOLDER}:/backup" \
mongo:latest bash -c "mongodump --out /backup --host mongoeva:27017"

```