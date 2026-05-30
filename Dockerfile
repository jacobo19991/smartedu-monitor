# --- Etapa 1: Instalación y Build ---
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar dependencias y resolverlas
COPY package.json package-lock.json ./
RUN npm ci

# Copiar el resto del código y compilar la aplicación React
COPY . .
RUN npm run build

# --- Etapa 2: Producción (Servidor Ligero) ---
FROM nginx:alpine

# Copiar los artefactos estáticos de la etapa de construcción al servidor Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Exponer el puerto estándar
EXPOSE 80

# Comando para ejecutar Nginx
CMD ["nginx", "-g", "daemon off;"]
