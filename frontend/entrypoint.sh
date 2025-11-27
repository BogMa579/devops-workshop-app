#!/bin/sh
# Create config.js from environment variables
echo "window.ENV = {" > /usr/share/nginx/html/config.js
echo "  BACKEND_URL: \"${BACKEND_URL:-/api}\"" >> /usr/share/nginx/html/config.js
echo "};" >> /usr/share/nginx/html/config.js

# Start Nginx
exec nginx -g "daemon off;"
