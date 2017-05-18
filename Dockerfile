FROM node:slim
#Variables de entorno para desarrolo
ENV NODE_ENV=production
ENV MODE_RUN=production

#Creación del directorio de la aplicación dentro del docker
RUN mkdir -p /app_license
WORKDIR /app_license

#Instalación de las depencias de la aplicación para producción
COPY package.json /app_license
RUN npm install --production

#Copia de los ficheros (Excepto los de dockerignore)
COPY . /app_license

#Construimos el fichero principal con webpack
RUN npm run build

#Activamos el puerto 3000
EXPOSE 3000

#Configuramos como punto de entrada el arranque del servidor
ENTRYPOINT npm run start