FROM node:17-alpine3.14 as build

ENV NODE_ENV production

WORKDIR /srv

COPY . /srv/

# Create app directory
# WORKDIR /usr/src/app

COPY package*.json ./

RUN /usr/local/bin/npm install

RUN ./node_modules/typescript/bin/tsc -p ./tsconfig.json

# If you are building your code for production
# RUN npm ci --only=production

EXPOSE 8080

CMD [ "node", "dist/server.js" ]