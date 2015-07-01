#!/bin/bash
PORT=3000
MEDIA_DIR=public/build/media

# test

# pull from master
while read oldrev newrev ref
do
  if [[ $ref =~ .*/master$ ]];
  then
    echo "Master ref received. Deploying master branch to production..."
    git --work-tree=/home/wkd/nodes/production --git-dir=/home/wkd/nodes/production checkout -f
  else
    echo "Ref $ref successfully received. Doing nothing. only the master branch may be deployed here."
  fi
done


# install npm & bower dependencies
echo "Installing NPM dependencies..."
npm install
echo "Installing Bower dependencies..."
bower install


# check if need to bundle media, restart app
if [ -d "$MEDIA_DIR" ]; then

  echo "media directory exists; starting app without bundling media"
  if DEBUG=matsuda PORT=$PORT NODE_ENV=production forever restart bin/www; then
    echo "Forever restarted app on port $PORT"
  else
    DEBUG=matsuda PORT=$PORT NODE_ENV=production forever start bin/www
    echo "Forever started app on port $PORT"
  fi

else

  echo "Media directory doesn't exist; will download media before starting app"
  if DEBUG=matsuda PORT=$PORT NODE_ENV=production BUNDLE=true forever restart bin/www; then
    echo "Forever restarted app on port $PORT"
  else
    DEBUG=matsuda PORT=$PORT NODE_ENV=production BUNDLE=true forever start bin/www
    echo "Forever started app on port $PORT"
  fi

fi
