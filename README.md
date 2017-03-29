Estructura de la aplicación
===========================

		.
		├── README.md
		├── index.js
		├── package.json
		├── webpack.config.js
		├── config
		│	└── config.json
		├── client
		│   │── src
		│   │   ├── components
		│	│	│	 ├──Base.jsx
		│	│	│	 ├──Dashboard.jsx
		│	│	│	 ├──Home.jsx
		│	│	│	 └──LoginForm.jsx
		│   │   ├── containers
		│	│	│	 ├──BasePage.jsx
		│	│	│	 ├──DashboardPage.jsx
		│	│	│	 ├──HomePage.jsx
		│	│	│	 └──LoginPage.jsx
		│   │   └── modules
		│	│		 └──Auth.jsx
		│ 	├──Base.jsx
		│ 	├──Dashboard.jsx
		│ 	├──Home.jsx
		│ 	└──LoginForm.jsx
		├── server
		│   ├── routes
		│	│	├── api.jsx
		│   │   └── auth.js
		│   ├── static
		│   │   ├── css
		│   │   │   └── style.css
		│   │   └── index.html
		│   ├── models
		│   │    ├── user.js
		│   │    └── models.js
		│   │── passport
		│   │    ├── local-login.js
		│   │    └── local-signup.js
		│   └── middleware
		│		└── auth-check.js		
		├── test
		│    └── model_user.test.js
		│
		├── .travis.yml
		├── .gitignore
		├── index.js
		├── package.json
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
* __react-boostrap__ : Librería para utilización de componentes boostrap. 


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

En el fichero models/models.js se realiza la configuración de sequelize según el fichero config/config.json, exportará los modelos y creará las realaciones entre ellos.

Existe una función que realiza la conexión con la base de datos. 
	Accepta dos parámetros:
		- mode: Puede ser test o development.
		- done: Callback para notificar cuando la conexión haya terminado. Devuelve el objeto sequelize como segundo parámetro o error en el primero si lo hubiera.

Hay que aclarar que existe un fichero config/config.json con información relevante a las bases de datos definidas en MySql, el nombre de usuario y la contraseña del dueño de dicha base de dato, un booleano para indicar si queremos que nos muestre o no logs en tiempo de ejecucion y una clave privada para la creación de lso tokens.

Definición del modelo usuario
=======================================

En el directorio models existe el fichero user.js el cual define el modelo para un usuario.

En este fichero se comprueba que todos los campos del usaurio cumplen los requisitos (email correcto, contraseña entre 8 y 15 carácteres, si el rol es normal o admin... )

También se han creado funciones setter y getter para conseguir que la contrasña se encripte antes de almacenarla, que el email siempre se guarde en minúsculas y que al pedir el campo password se devuelva la contraseña encriptada (hash_password)

Por otro lado se han creado los siguientes métodos de instancia:
		1) verifyPassword, encargada de verificar que la contraseña es correcta para esa instancia (usuario)
			Esta función acepta como parámetro el siguiente campo:
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


Ficheros del cliente
====================
	
	Principales ficheros del cliente
	--------------------------------

	En el lado del cliente existen 3 ficheros principales:

		*__App.jsx__ : Fichero encargado de crear el componente principal de la aplicación, el cual incluirá a todos los demás elementos de forma recursiva, es decir es el componente padre de todos. Dentro de él se hace uso de react-router mediante el componente router, al cual se le pasan las rutas definidas en el fichero routes.js

		*__index.jsx__ : Fichero de entrada para webpack. Es el encargado de interpretar el componente App dentro del fichero HTML.

		*__routes.js__ : Fichero que contiene las rutas necesarias para react router. Cuando se accede a alguna ruta definida en dicho fichero, se creará un componente BasePage cuyo hijo será el que haga mach con esa ruta.

	Componentes JSX de la aplicación
	--------------------------------

	Dentro del directorio client/src/components se encuentran los siguientes componentes:

		*__Base__ : Componente principal de la aplicación. Es el encargado de mostrar la barra de navegación con los diferentes enlaces a las diferentes rutas. Acepta como propiedad 'children', la cual será el componente a mostrar debajo de la barra de navegación del componente base. 

		*__Home__ : Componente encargado de mostrar la página principal de la aplicación a los usuarios que no están loguados. Acepta como propiedades un mensaje de éxito, el cuál será mostrado si existe dicho mensaje.

		*__Dashboard__ : Componente encargado de mostrar la página principal una vez que un usuario está logueado. Acepta como propiedad una cadena de caráteres que será una frase secreta sólo visible si estás logueado.

		*__LoginForm__ : Componente encargado de crear el formulario de inicio de sesión. Acepta como propiedades las funciones 'onChange', encargada de manejar los campos que van cambiando, 'onSubmit', encargada de manejar cuando se envía el formulario, 'errors', objeto encargado de almacenar los errores para cada campo además de un resumen (summary) y por último 'user', objeto encargado de almacenar los valores suministrados en el formulario.



	Contenedores JSX de la aplicación
	---------------------------------

	La principal diferencia entre los Componentes (conocidos en inglés como Presentational Component) y los contenedores radica en que los componentes interpretan directamente los componentes JSX que se encuentran definidos en ellos (Es decir, cómo se ven las cosas), mientras que los contenedores se encargan de tratar los datos, utilizar funciones y pasársela a los componentes (Cómo se hacen las cosas).

	En esta aplicación los contenedores se encuentran en el directorio client/src/containers y son los siguientes:

		*__BasePage__ : Contenedor encargado de gestionar el componente Base, de momento no le hace ningún cambio.

		*__HomePage__ : Contenedor encargado de mostrar el componente Home. Obtiene, si procede, el mensaja de éxito del almacenamiento local, lo elimina y se lo pasa al componente para que lo muestre.

		*__DashboardPage__ : Contenedor encargado de gestionar el componente Dashboard. Obtiene el nombre y el email del usuario logueado del almacenamiento local del navegador (previamente se ha almacenado en LoginPage) para escribir un mensaje personal y pasárselo a Base como secretMessage.

		*__LoginPage__ : Contenedor encargado de definir las funciones necesarias para el tratamiento de los datos del formulario (onChange) y el tratamiento del envío del formulario, en el cual se hace una petición AJAX al servidor para que autorice/deniegue al usuarío, almacenando el token si se le permite el acceso.

	Ficheros utiles para la autenticacion en el lado del cliente
	------------------------------------------------------------

	Dentro del directorio client/modules se encuentra el fichero Auth.js que posee metodos necesarios para almacenar el token de un usuario una vez registrado (authenticateUser), comprobar si un usuario está logueado, es decir si existe el token (isUserAuthenticated), desautenticar a un usuario borrando su token (deauthenticateUser) y un metodo para recuperar el token (getToken).

	

Ficheros del servidor
====================
	
	Principales ficheros del servidor
	--------------------------------

	En el lado del servidor existe 1 fichero principal, el fichero index.js, el cual es el fichero al que accede el servidor al arrancarse en el se realiza lo siguiente:
	
		1) Se crea una conexión a la base de datos correspondiente (en funcion de la variable de entorno MODE_RUN)
		
		2) Se definen las rutas estáticas para el servidor

		3) Se definen las estrategias para la librería passport de autenticación

		4) Se definen las rutas disponibles en el servidor (auth y api)

		5) Se asigna un middleware (pasarela) a la ruta api para asegurarse que solo acceden clientes autenticados la api.

	Ficheros útiles para passport (autenticación)
	---------------------------------------------

	Dentro del directorio server/passport se encuentran los ficheros necesarios para manejar las estrategias de inicio de sesión y registro de un usuario:

		*__local-login.js__ : En este fichero se crea una nueva estrategia para passport en la cual se configura dicha estrategia, se comprueba si el email introducido junto con su contraseña son válidos y en dicho caso se crea el token con la clave secreta del fichero config_json, el identificador de usuario y una cabecera.

		*__local-signup.js__ : En este fichero lo que se realiza es una nueva estraegia para almacenar un nuevo usuario registrado, para ello obtiene los datos del usuario que se ha registrado y se almacena en la base de datos.

	Dentro del fichero server/middleware se ha creado el fichero auth-check.js encargado de comprobar si un cliente está logueado y en dicho caso dar paso a la petición hacia la api definida en el fichero index.js del servidor

	Ficheros de rutas para peticiones
	---------------------------------
	
	Dentro del directorio server/routes se encuentran los ficheros con los métodos get y post definidos en el servidor. 

	Para el fichero api se ha definido un middleware con la idea de que cada vez que se envíe una peticion a algunos de sus métodos, la peticion previamente pase por auth-check.js verificando que el usuario está autorizado para aceder.

	En el fichero auth.js se definen los métodos que atienden las peticiones necesarias para la autenticación de un usuario.





