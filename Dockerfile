# FROM node:12.16.2-alpine as build-step
FROM trion/ng-cli:9.0.1
RUN mkdir /src
WORKDIR /src
COPY package.json ./
COPY . /src/
RUN npm install
RUN npm install ng-pick-datetime@7.0.0
RUN npm run build
FROM nginx:1.17.9-alpine as prod-stage
RUN rm -rf /home/*
COPY --from=build-step /src/dist/ /home/
EXPOSE 80
CMD ["nginx","-g","daemon off;"]
# docker exec -it ngedmsfrontend sh
# docker exec -it nginxedmsfrontend sh
