FROM node:20-alpine3.20 

WORKDIR /app

COPY package*.json ./

RUN npm i

EXPOSE 8000

COPY . .

CMD ["npm", "run", "dev"]

