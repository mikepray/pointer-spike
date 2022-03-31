FROM node:17-alpine3.14

COPY . /srv/

# Create app directory
# WORKDIR /usr/src/app
WORKDIR /srv

COPY package*.json ./

RUN /usr/local/bin/npm install

# If you are building your code for production
# RUN npm ci --only=production

EXPOSE 8080

CMD [ "node", "dist/server.js" ]