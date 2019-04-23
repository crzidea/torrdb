FROM node:8

COPY . torrdb
WORKDIR torrdb
RUN npm install --production

CMD npm start
