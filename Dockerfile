# Usa una imagen oficial de Node.js como imagen base
FROM node:19-alpine

# Establece el directorio de trabajo en el contenedor
WORKDIR /

# Copia los archivos package.json y package-lock.json en el contenedor
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código en el contenedor
COPY . .

# Especifica el comando para ejecutar la aplicación
CMD ["npm", "start"]