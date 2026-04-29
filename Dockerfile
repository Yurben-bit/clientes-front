# 1️⃣ Etapa de construcción
FROM node:20-alpine AS build

# Establecer directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código
COPY . .

ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}

# Construir la aplicación para producción
RUN npm run build

# 2️⃣ Etapa de servidor
FROM nginx:stable-alpine

# Copiar archivos de build al directorio de Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Exponer el puerto 80
EXPOSE 80

# Comando por defecto para Nginx
CMD ["nginx", "-g", "daemon off;"]
