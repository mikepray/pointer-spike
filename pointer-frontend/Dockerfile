# build environment
FROM node:17-alpine3.14 as build

ENV NODE_ENV production

RUN mkdir /app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app

# CMD ["npm", "start"]
# EXPOSE 3000

RUN npm run build

ENV NODE_ENV production

FROM nginx:alpine
# Copy build assets to nginx static folder
COPY --from=build /app/build /usr/share/nginx/html
# Copy nginx reverse-proxy config
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD [ "nginx", "-g", "daemon off;"]