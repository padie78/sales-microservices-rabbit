FROM node:18

WORKDIR /app
VOLUME /app/node_modules

COPY package*.json ./
RUN npm install

RUN npm install -g nodemon

COPY . .

CMD ["npx", "nodemon", "--legacy-watch", "--watch", "src", "src/main.ts"]
