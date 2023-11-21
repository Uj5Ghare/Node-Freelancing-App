FROM node:18-alpine

WORKDIR /app

COPY . /app

RUN npm install 

EXPOSE 5000

CMD ["node", "app.js"]

