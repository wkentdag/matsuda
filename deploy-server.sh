#!/bin/bash

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

echo "Installing NPM dependencies..."
npm install

echo "Installing Bower dependencies..."
bower install

if DEBUG=matsuda PORT=4000 forever restart bin/www; then
  echo "Forever restarted app"
else
  DEBUG=matsuda PORT=4000 forever start bin/www
  echo "Forever started app"
fi