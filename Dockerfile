# develop stage
FROM node:14.16.0-alpine as develop-stage
WORKDIR /app
COPY package*.json ./
RUN npm install -g @quasar/cli
COPY . .

# build stage
FROM develop-stage as build-stage
RUN npm install
RUN quasar build

# production stage
FROM nginx:1.17.5-alpine as production-stage
COPY --from=build-stage /app/dist/spa /usr/share/nginx/html
# Add nginx config
COPY ./docker/nginx/nginx.conf /temp/nginx.conf
RUN envsubst /app < /temp/nginx.conf > /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]