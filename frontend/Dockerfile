# Начальный образ, на котором будут базироваться наши контейнеры
FROM node:alpine AS build

# Установка рабочей директории внутри контейнера
WORKDIR /app

# Копирование package.json и package-lock.json
COPY package*.json ./

# Установка зависимостей
RUN npm ci --only=production

# Копирование исходных файлов React
COPY . .

# Сборка приложения
RUN npm run build -- --optimize-minimize

# Очистка зависимостей и файлов после сборки
RUN rm -rf node_modules && \
    rm -f package*.json

# Создание образа Nginx
FROM nginx:latest

# Копирование собранного React-приложения в образ Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Копирование конфигурационного файла Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Открытие порта для доступа к Nginx
EXPOSE 80

# Команда, запускающая Nginx
CMD ["nginx", "-g", "daemon off;"]
