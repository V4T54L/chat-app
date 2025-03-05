FROM node:23-alpine AS builder

WORKDIR /app

ENV VITE_API_BASE_URL=https://fantastic-orbit-5pw55g49gr4f47vp-8080.app.github.dev/
ENV VITE_WS_BASE_URL=wss://fantastic-orbit-5pw55g49gr4f47vp-8080.app.github.dev/ws

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:alpine

EXPOSE 80

COPY --from=builder /app/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]