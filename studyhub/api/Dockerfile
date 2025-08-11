# ==== Build stage ====
FROM node:20-alpine AS build
WORKDIR /app

# 1) Instala deps con cache (solo si cambian los manifests)
COPY package*.json ./
# Si tienes package-lock.json usa npm ci (más rápido/seguro):
# RUN npm ci
RUN npm install

# 2) Copia el resto del código y compila
COPY tsconfig.json ./
COPY src ./src
RUN npm run build

# ==== Runtime stage (más ligera) ====
FROM node:20-alpine AS runtime
WORKDIR /app

# Solo los archivos necesarios para ejecutar
COPY package*.json ./
# Dependencias de producción únicamente
# Si tienes lock: RUN npm ci --omit=dev
RUN npm install --omit=dev

# Copiamos el build ya compilado
COPY --from=build /app/dist ./dist

EXPOSE 8080
CMD ["npm","run","start"]
