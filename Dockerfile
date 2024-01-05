FROM node:latest AS Build

WORKDIR /app

COPY . /app

RUN npm install



FROM node:18-alpine

WORKDIR /node

COPY --from=Build /app /node

EXPOSE 3000

CMD ["node", "app.js"]


