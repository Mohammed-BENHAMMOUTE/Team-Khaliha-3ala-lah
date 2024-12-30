FROM node:10
WORKDIR /app/gateway
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm","start"]

