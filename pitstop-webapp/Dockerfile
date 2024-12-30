FROM node:10
WORKDIR /app/client
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "run", "serve"]

