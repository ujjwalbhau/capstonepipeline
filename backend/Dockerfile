FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

EXPOSE 4000
CMD ["./wait-for-mysql.sh", "mysql", "node", "server.js"]

#CMD ["npm", "start"]
