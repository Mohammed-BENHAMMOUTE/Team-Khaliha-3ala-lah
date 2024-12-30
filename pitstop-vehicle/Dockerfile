FROM node:10
WORKDIR /app/vehicle
COPY package.json ./
RUN npm install
COPY . .
CMD ["npm","start"]

