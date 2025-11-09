FROM node:22-alpine
WORKDIR /Backend
RUN apk update && apk add --no-cache g++ python3 openjdk21
COPY . .
RUN npm install
EXPOSE 8000
CMD ["node","index.js"]