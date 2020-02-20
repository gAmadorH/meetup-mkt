FROM node:10-alpine
RUN mkdir -p /home/node/meetup-mkt/node_modules && chown -R node:node /home/node/meetup-mkt
WORKDIR /home/node/meetup-mkt
COPY package*.json ./
COPY .env ./
USER node
RUN npm install
COPY --chown=node:node ./ ./
EXPOSE 80
CMD [ "npm", "start" ]
