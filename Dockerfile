FROM node:boron

#Creación del directorio de la aplicación
RUN mkdir -p /usr/src/app_license
WORKDIR /usr/src/app_license

#Instalación de las depencias de la aplicación
COPY package.json /usr/src/app_license
RUN npm install

#Copia de los ficheros 
COPY . /usr/src/app_license

#Construimos el fichero principal con webpack
RUN npm build

#Activamos el puerto 3000
EXPOSE 3000

#Ejecutamos el comando npm start
CMD ["npm", "start"]