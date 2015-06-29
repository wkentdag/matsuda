#!/bin/bash

while read oldrev newrev ref
do
  if [[ $ref =~ .*/beta$ ]];
  then
    echo "Starting pre-push beta hook..."

    echo "Copying deploy-server.sh to server..."
    cat deploy-server.sh | ssh wkd@williammatsuda.com "cat > ~/nodes/beta/hooks/post-receive"
    echo "Finished copying deploy-server.sh to remote post-receive hook"

    echo "Copying gitignore'd production files to server..."
    gulp build
    rsync -avz \
      --exclude=media/ \
      --exclude=bower_components/ \
      public/build/ wkd@williammatsuda.com:/home/wkd/nodes/beta/public/build

    rsync -avz tumblr-auth.js wkd@williammatsuda.com:/home/wkd/nodes/beta
    echo "Finished copying build files"
  else
    echo "Ref $ref successfully received by pre-push hook, but will only run if ref = beta"
  fi

  echo "Finished pre-push hook"
done

