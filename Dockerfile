FROM node:10

WORKDIR /usr/src/app
COPY . ./
RUN npm install && npm audit fix

CMD ["node", "src/index.js"]

