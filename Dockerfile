FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV VITE_ICD_SERVER_BASE_URL='http://18.218.47.23:8000' VITE_NODE_ENV='production'

RUN npm run build

EXPOSE 4173

CMD ["npm", "run", "preview"]