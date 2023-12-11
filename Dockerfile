FROM node

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]

  # for production environment
  #FROM node:latest as build
  #
  #WORKDIR /app
  #
  #COPY package.json package-lock.json* ./
  #
  #RUN npm install
  #
  #COPY . .
  #
  #RUN npm run build
  #
  ## 2: server configuration
  #FROM nginx:alpine
  #
  #COPY --from=build /app/dist /usr/share/nginx/html
  #
  ## По умолчанию Nginx слушает на 80 порту
  #EXPOSE 80
  #
  #CMD ["nginx", "-g", "daemon off;"]