FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN npm rebuild bcrypt --build-from-source

COPY . .

EXPOSE 3002

CMD ["node", "index.js"]
