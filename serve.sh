#!/bin/bash
cd /Users/Karine/Desktop/site-web-free
export PATH="/Users/Karine/.nvm/versions/node/v22.16.0/bin:$PATH"
exec /Users/Karine/.nvm/versions/node/v22.16.0/bin/node \
  /Users/Karine/.nvm/versions/node/v22.16.0/bin/npx \
  serve /Users/Karine/Desktop/site-web-free \
  --listen ${PORT:-3000} \
  --no-clipboard
