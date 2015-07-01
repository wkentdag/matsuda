#!/bin/bash

while read oldrev newrev ref
do
  echo "Starting pre-push master hook..."

  echo "Copying deploy-server.sh to server..."
  cat deploy-server.sh | ssh wkd@williammatsuda.com "cat > ~/nodes/production/hooks/post-receive"
  echo "Finished copying deploy-server.sh to remote post-receive hook"

  echo "Copying gitignore'd production files to server..."
  gulp build
  rsync -avz \
    --exclude=media/ \
    --exclude=bower_components/ \
    public/build/ wkd@williammatsuda.com:/home/wkd/nodes/production/public/build

  rsync -avz tumblr-auth.js wkd@williammatsuda.com:/home/wkd/nodes/production
  echo "Finished copying build files"

  echo "Finished pre-push hook"
done
