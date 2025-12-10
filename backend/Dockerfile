FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci
COPY . .

# install netcat for wait-for-mysql.sh
RUN apk add --no-cache netcat-openbsd

COPY . .

# ensure script is executable
RUN chmod +x ./wait-for-mysql.sh

EXPOSE 3000
# Run the wait script with a shell so it is executed by sh, then exec the provided command (node server.js)
CMD ["sh", "-c", "./wait-for-mysql.sh mysql node server.js"]

#CMD ["npm", "start"]
