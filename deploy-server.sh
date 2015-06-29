#!/bin/bash
PORT=4000
MEDIA_DIR=public/build/media


# pull from beta
while read oldrev newrev ref
do
  if [[ $ref =~ .*/beta$ ]];
  then
    echo "Beta ref received. Deploying beta branch to beta production..."
    git --work-tree=/home/wkd/nodes/beta --git-dir=/home/wkd/nodes/beta checkout -f
  else
    echo "Ref $ref successfully received. Doing nothing. only the beta branch may be deployed here."
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
  if DEBUG=matsuda PORT=$PORT forever restart bin/www; then
    echo "Forever restarted app on port $PORT"
  else
    DEBUG=matsuda PORT=$PORT forever start bin/www
    echo "Forever started app on port $PORT"
  fi

else

  echo "Media directory doesn't exist; will download media before starting app"
  if DEBUG=matsuda PORT=$PORT BUNDLE=true forever restart bin/www; then
    echo "Forever restarted app on port $PORT"
  else
    DEBUG=matsuda PORT=$PORT BUNDLE=true forever start bin/www
    echo "Forever started app on port $PORT"
  fi
  
fi
