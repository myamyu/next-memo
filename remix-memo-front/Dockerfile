FROM node:16.13.0-slim

WORKDIR /webapp
COPY . .

RUN npm ci && npm run build

CMD ["npm", "start"]
