FROM node:slim
#Variables de entorno para desarrolo
ENV NODE_ENV=development
ENV MODE_RUN=development

#Creación del directorio de la aplicación dentro del docker
RUN mkdir -p /app_license
WORKDIR /app_license

#Activamos el puerto 3000
EXPOSE 3000

#Ejecutamos el comando npm start en modo desarrollo
ENTRYPOINT npm run start:dev
