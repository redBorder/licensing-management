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
* __password-hash__ : Librería para encriptacion de contraseñas. 
* __mocha, assert__ : Librerías para los test con mocha.


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


Conexion a la base de datos mediante Sequelize
==============================================

En el fichero models/models.js se realiza la configuracion de sequelize segun variables de entorno, exporta los modelos y se harán las realaciones entre ellos.

Existe una función que realiza la conexión con la base de datos. 
	Accepta dos parámetros:
		- mode: Puede ser mode_test o mode_development (utilizar las variables exportadas del modulo).
		- done: Callback para notificar cuando la conexión haya terminado. Devuelve el objeto sequelize.



Definición del modelo usuario
=======================================

En el directorio models existe el fichero user.js el cual define el modelo para un usuario.

En este fichero se comprueba que todos los campos del usaurio cumplen los requisitos (email correct, password entre 8 y 15 caracteres, el rol es normal o admin... )

También se han creado funciones setter y getter para conseguir que la contrasña se encripte antes de almacenarla, que el email siempre se guarde en minúsculas y que al pedir el campo password se devuelva la contraseña encriptada (hash_password)

Por otro lado se han creado los siguientes métodos de instancia:
		1) verifyPassword, encargada de verificar que la contraseña es correcta para esa instancia (usuario)
			Esta función acepta como parámetros el siguiente campo:
				-Password: Contraseña sin encriptar a verificar
			Esta función devuelve true o false en función de que sea o no correcta la contraseña a verificar

		2) changePassword, ncargada de verificar que la contraseña de dicho usuario es correcta.
			Esta función acepta como parámetros los siguientes campos:
				-Password: Contraseña actual del usuario.
				-New_password: Nueva contraseña a almacenar.
			Esta función devuelve true o false en función de que sea o no correcta la contraseña actual y se haya podido cambiar.

En cuanto a los métodos de clase se han creado los siguientes:
		1) findByEmail, funcion asíncrona encargada de buscar un usuario en por su email.
			Esta función acepta como parámetros lso siguientes campos:
				-email: Email con el que buscar el usuario.
				-done: Función de CallBack la cual tiene dos parámetros, el primero es el error y el segundo es el usuario encontrado.



Test del modelo User
====================

En el directorio test se encuentra el fichero model_user.test.js encargado de realizar los siguientes test:
	
	1) Comprobar que cada vez que se inicia en el modo test la base de datos está vacía de contenido (pero si tiene tablas)

	2) Comprobar que cuando añadimos un usuario, solo se añade uno.

	3) Comprobar que si la contraseña es de menos de 8 caracteres no se crea el usuario.

	4) Comprobar que si la contraseña es de mas de 15 caracteres no se crea el usuario.

	5) Comprobar que si la contraseña está en blanco no se crea el usuario.

	6) Comprobar que si el rol no es admin o normal no se crea el usuario.

	7) Comprobar que si el rol está vacío no se crea el usuario.

	8) Comprobar que si el email tiene un formato inválido no se crea el usuario.

	9) Comprobar que se puede encontrar un usuario creado por su email.

	10) Comprobar que un usuario se crea con los parámetros indicados.

	11) Comprobar que al crear un usuario la contraseña se encripta correctamente y la podemos verificar.

	12) Comprobar que podemos cambiar la contraseña de un usuario creado previamente.

	13) Comprobar que si la contraseña actual es incorrecta no se nos permite cambiar la contraseña.

	14) Comprobar que podemos cambiar la contraseña de un usario que previamente estaba guardado en la base de datos.
	
