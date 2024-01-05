FROM node:18-alpine AS Build

WORKDIR /app

COPY package*.json /app

RUN npm install --only prod

COPY . .



FROM node:18-alpine

WORKDIR /node

COPY --from=Build /app/package*.json .

COPY --from=Build /app .

EXPOSE 3000

CMD ["node", "app.js"]

