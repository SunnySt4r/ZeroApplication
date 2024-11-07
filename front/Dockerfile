FROM node:20-alpine3.16 AS build

WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .
EXPOSE 3000
RUN npm run build
CMD ["npm", "start"]
