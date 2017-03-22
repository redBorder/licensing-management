Estructura de la aplicación
===========================

		.
		├── README.md
		├── config
		│	└── config.json
		├── client
		│   └── src
		│       ├── app.jsx
		│       ├── components
		│       │   ├── Base.jsx
		│       │   ├── HomePage.jsx
		│       │   ├── LoginForm.jsx
		│       │   └── SignUpForm.jsx
		│       ├── containers
		│       │   ├── LoginPage.jsx
		│       │   └── SignUpPage.jsx
		│       └── routes.js
		├── index.js
		├── package.json
		├── server
		│   ├── routes
		│   │   └── auth.js
		│   └── static
		│       ├── css
		│       │   └── style.css
		│       └── index.html
		└── webpack.config.js



Arquitectura de la aplicación
=============================

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
* __node-uuid__ : Librería para generar uuid aleatorios que identifiquen a los usuarios en la base de datos

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


Conexion a la base de datos medianta Sequelize
==============================================

En el fichero models/models.js se realiza la configuracion de sequelize segun variables de entorno, exporta los modelos y se harán las realaciones entre ellos.

Existe una función que realiza la conexión con la base de datos. 
	Accepta dos parámetros:
		- mode: Puede ser mode_test o mode_development (utilizar las variables exportadas del modulo).
		- done: Callback para notificar cuando la conexión haya terminado. Devuelve el objeto sequelize.



Manejo de los modelos de forma sencilla
=======================================

En el directorio server/utils se irán creando ficheros encargados de controlar el manejo de los modelos.

Existe un fichero llamado user_controlled el cual tiene definida las siguientes funciones:

		1) NewUser, encargada de crear y añadir un nuevo usuario al modelo Users
			Esta funcion acepta como parámetros los siguientes campos
				-name: Nombre del usuario a crear
				-email: Email del usuario a crear
				-password: Contraseña del usuario sin encriptar (Se realiza el hash dentro)
				-rol: Rol del usuario a crear
				-done: Funcion que hará de CallBack, en el primer parámetro devuelve el error y en el segundo el usuario creado.
			Dentro de la función se hace uso de la librería node-uuid para generar un uuid aleatorio y asisgnarselo a dicho usuario.