FROM node:12

ARG TAG_NAME
ARG NPM_TOKEN

WORKDIR /app
COPY . .

# inject environment
RUN echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN" > .npmrc

# install app packages
RUN npm i --production=false

# build NPM package
RUN npm run build

# ONLY with deployments tagged with release number
# replace package version with code repo tag number && publish npm package
RUN [ -z "$TAG_NAME" ] || (sed -i '/\"version\"/s/[^\:]*$/'" \"${TAG_NAME}\",/" package.json && npm publish)
