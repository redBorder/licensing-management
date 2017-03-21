		Arquitectura de la aplicación
==============================================

Se ha iniciado el repositorio con npm init

Se han instalado las siguientes dependencias:
* __express__ : Librería usada de base para desplegar nuestra aplicación
* __body-parser__ : Librería para poder leer datos de los mensajes HTTP
* __react__ : Librería para constuir la parte del cliente con React
* __react-dom__ : Librería para interpretar los componentes de React en el DOM
* __react-router__ : Libreria utilizada para manejar rutas con React
* __react-tap-event-plugin__ : Para evitar el retraso en los componentes que aceptan eventos (onClick, onMouse...)
* __validator__ : Librería para la validadación (por ejemplo asegurarnos que es un email válido)
* __webpack__ : Librería para poder utilizar webpack
* __babel-core, babel-preset-react, babel-preset-es2015, babel-loader__ : Librerías usadas para realizar la transpilación
* __nodemon__ : Librería que monitoriza cambios en la aplicación y reinicia el servidor

	Scripts de servicio:
	--------------------
	
	Para lanzar webpack en modo watch utilizaremos el siguiente comando
	
		$ npm run build:dev
	
	Para lanzar webpack en modo normal utilizaremos el siguiente comando
	
		$ npm run build
	
	Para lanzar el servidor en la dirección de localhost y puerto 3000 utilizaremos el siguiente comando
	
		$ npm run build

	Para lanzar el servidor de MySql
	--------------------------------

		$ sudo /usr/local/mysql/support-files/mysql.server start