#!/bin/bash
echo "Copying deploy-server.sh to server..."
cat deploy-server.sh | ssh wkd@williammatsuda.com "cat > ~/nodes/beta/hooks/post-receive"
echo "Finished copying deploy-server.sh to post-receive hook"

echo "Copying gitignore'd production files to server..."
rsync -avz \
  --exclude=media/ \
  --exclude=bower_components/ \
  public/build/ wkd@williammatsuda.com:/home/wkd/nodes/beta/public/build

rsync -avz tumblr-auth.js wkd@williammatsuda.com:/home/wkd/nodes/beta
echo "Finished copying build files"

