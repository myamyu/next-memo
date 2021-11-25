FROM node:16.13.0-slim

WORKDIR /webapp
COPY . .

RUN npm ci --no-progress && npm run build

CMD ["npm", "run", "start:prod"]
