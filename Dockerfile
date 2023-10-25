FROM node:16

ENV APP_PORT=3000 \
    APP_HOST=0.0.0.0

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE $APP_PORT

CMD ["npm", "run", "start"]
