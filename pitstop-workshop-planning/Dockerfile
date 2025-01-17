FROM node:10
WORKDIR /app/workshop-planning
COPY package*.json ./
RUN npm install --production=false
RUN npm install sequelize sequelize-cli --save
COPY . .
CMD ["npm","start"]

