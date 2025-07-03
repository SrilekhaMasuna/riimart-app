FROM node:18

WORKDIR /app

COPY Backend/package*.json ./

RUN npm install

COPY Backend/ .

EXPOSE 5000

CMD ["node", "server.js"]
