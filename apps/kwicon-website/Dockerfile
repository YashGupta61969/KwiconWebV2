FROM node:16 AS app
WORKDIR /app
COPY . .
RUN npm i -g nx
RUN npm install -g pnpm
RUN pnpm install

ARG API_URL
ARG IMAGE_SAS_TOKEN
ARG APP_AUTH0_DOMAIN
ARG APP_AUTH0_CLIENT_ID
ARG APP_URL
ARG WEBSITE_URL

ENV VITE_API_URL=$API_URL
ENV VITE_IMAGE_SAS_TOKEN=$IMAGE_SAS_TOKEN
ENV VITE_APP_AUTH0_DOMAIN=$APP_AUTH0_DOMAIN
ENV VITE_APP_AUTH0_CLIENT_ID=$APP_AUTH0_CLIENT_ID
ENV VITE_APP_URL=$APP_URL
ENV VITE_WEBSITE_URL=$WEBSITE_URL

RUN nx run kwicon-website:build

FROM nginx AS server

WORKDIR /usr/share/nginx/html

COPY --from=app /app/dist/apps/kwicon-website ./
COPY --from=app /app/apps/kwicon-website/nginx.conf /etc/nginx/nginx.conf
