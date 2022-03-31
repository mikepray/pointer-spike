# build environment
FROM node:17-alpine3.14 as build

WORKDIR /app
COPY . .

RUN /usr/local/bin/npm install

EXPOSE 3000

CMD ["npm", "start"]