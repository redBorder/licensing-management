Estructura de la aplicación
===========================

		.
		├── README.md
		├── index.js
		├── .travis.yml
		├── .gitignore
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
		└── test
		    └── model_user.test.js
		



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
* __mocha, assert, chai__ : Librerías para los test con mocha.
* __react-boostrap__ : Librería para utilización de componentes boostrap. 
* __chai-http__ : Librería para hacer test al servidor.
* __sequelize-fixtures__ : Librería para manejar fixtures para los test. 
* __nodemailer : Librería para poder enviar correos electrónicos.
* __async__ : Librería para realizar tareas asíncronas 
* __crypto__ : Librería para generar un token aleatorio al recordar la contraseña



	Scripts de servicio:
	--------------------
	
	Para lanzar webpack en modo watch utilizaremos el siguiente comando
	
		$ npm run build:dev
	
	Para lanzar webpack en modo normal utilizaremos el siguiente comando
	
		$ npm run build
	
	Para lanzar el servidor en la dirección de localhost y puerto 3000 utilizaremos el siguiente comando
	
		$ npm run start

	Para lanzar el servidor de MySql
	--------------------------------

		$ sudo /usr/local/mysql/support-files/mysql.server start


Conexion a la base de datos mediante Sequelize
==============================================

En el fichero models/models.js se realiza la configuración de sequelize según el fichero config/config.json, exportará los modelos y creará las realaciones entre ellos.

Existe una función que realiza la conexión con la base de datos la cuál se conectará a la base de datos test o developtment en función de la variable de entorno MODE_RUN.
	Tiene el siguiente parámetro:
		- done: Callback para notificar cuando la conexión haya terminado. Devuelve el objeto sequelize como segundo parámetro o error en el primero si lo hubiera.

Hay que aclarar que existe un fichero config/config.json con información relevante a las bases de datos definidas en MySql, el nombre de usuario y la contraseña del dueño de dicha base de dato, un booleano para indicar si queremos que nos muestre o no logs en tiempo de ejecucion y una clave privada para la creación de lso tokens.

Definición del modelo usuario
=======================================

En el directorio models existe el fichero user.js el cual define el modelo para un usuario.

En este fichero se comprueba que todos los campos del usaurio cumplen los requisitos (email correcto, contraseña entre 8 y 15 carácteres, si el rol es normal o admin... )

También se han creado funciones setter y getter para conseguir que la contraseña se encripte antes de almacenarla, que el email siempre se guarde en minúsculas y que al pedir el campo password se devuelva la contraseña encriptada (hashed_password)

Por otro lado se han creado los siguientes métodos de instancia:
		1) verifyPassword, encargada de verificar que la contraseña es correcta para esa instancia (usuario)
			Esta función acepta como parámetro el siguiente campo:
				-Password: Contraseña sin encriptar a verificar
			Esta función devuelve true o false en función de que sea o no correcta la contraseña a verificar

		2) changePassword, encargada de cambiar el campo contraseña de una instancia (usuario)
			Esta función acepta como parámetros los siguientes campos:
				-Password: Contraseña actual del usuario.
				-New_password: Nueva contraseña a almacenar.
			Esta función devuelve true o false en función de que sea o no correcta la contraseña actual y se haya, o no, podido cambiar.

En cuanto a los métodos de clase se han creado los siguientes:
		1) findByEmail, funcion asíncrona encargada de buscar un usuario por su email.
			Esta función acepta como parámetros lso siguientes campos:
				-email: Email con el que buscar el usuario.
				-done: Función de CallBack la cual tendrá dos parámetros, el primero es el error y el segundo es el usuario encontrado.



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

		*__index.jsx__ : Fichero de entrada para webpack. Es el encargado de interpretar el componente App dentro del fichero HTML de la página web.

		*__routes.js__ : Fichero que contiene las rutas necesarias para react router. Cuando se accede a alguna ruta definida en dicho fichero, se creará un componente BasePage cuyo hijo será el que haga mach con esa ruta.

	Componentes JSX de la aplicación
	--------------------------------

	Dentro del directorio client/src/components se encuentran los siguientes componentes:

		*__Base__ : Componente principal de la aplicación. Es el encargado de mostrar la barra de navegación con los diferentes enlaces a las diferentes rutas. Acepta como propiedad 'children', la cual será el componente a mostrar debajo de la barra de navegación del componente base. 

		*__Home__ : Componente encargado de mostrar la página principal de la aplicación a los usuarios que no están loguados. Acepta como propiedades un mensaje de éxito, el cuál será mostrado si existe dicho mensaje.

		*__Dashboard__ : Componente encargado de mostrar la página principal una vez que un usuario está logueado. Acepta como propiedad una cadena de caráteres que será una frase secreta sólo visible si estás logueado.

		*__LoginForm__ : Componente encargado de crear el formulario de inicio de sesión. Acepta como propiedades las funciones 'onChange', encargada de manejar los campos que van cambiando, 'onSubmit', encargada de manejar cuando se envía el formulario, 'errors', objeto encargado de almacenar los errores para cada campo además de un resumen (summary) y por último 'user', objeto encargado de almacenar los valores suministrados en el formulario.

		*__ForgotForm__ : Componente encargado de mostrar el formulario para el recordatorio de la contraseña. Este formulario solo pedirá en email, y en el caso de haber algún error lo mostrará.

		*__NewPasswordFormForm__ : Componente encargado de mostrar el formulario para el cambio de la contraeña olvidada. Este formulario contendrá la nueva contraseña junto con un campo de verificacion de la nueva contraseña.

		*__ProfileForm__ : Componente encargado de mostrar el formulario para el cambio del perfil de un usario. Este formulario contendrá el nombre del usuario, el email, la nueva contraseña y la contraseña actual.


	Contenedores JSX de la aplicación
	---------------------------------

	La principal diferencia entre los Componentes (conocidos en inglés como Presentational Component) y los contenedores radica en que los componentes interpretan directamente los componentes JSX que se encuentran definidos en ellos (Es decir, cómo se ven las cosas), mientras que los contenedores se encargan de tratar los datos, utilizar funciones y pasársela a los componentes (Cómo se hacen las cosas).

	En esta aplicación los contenedores se encuentran en el directorio client/src/containers y son los siguientes:

		*__BasePage__ : Contenedor encargado de gestionar el componente Base, de momento no le hace ningún cambio.

		*__HomePage__ : Contenedor encargado de mostrar el componente Home. Obtiene, si procede, el mensaja de éxito del almacenamiento local, lo elimina y se lo pasa al componente para que lo muestre.

		*__DashboardPage__ : Contenedor encargado de gestionar el componente Dashboard. Obtiene el nombre y el email del usuario logueado del almacenamiento local del navegador (previamente se ha almacenado en LoginPage) para escribir un mensaje personal y pasárselo a Base como secretMessage.

		*__LoginPage__ : Contenedor encargado de definir las funciones necesarias para el tratamiento de los datos del formulario (onChange) y el tratamiento del envío del formulario, en el cual se hace una petición AJAX al servidor para que autorice/deniegue al usuarío, almacenando el token si se le permite el acceso.

		*__ForgotPage__ : Contenedor encargado de definir las funciones necesarias para el tratamiento de los datos del formulario (onChange) y el tratamiento del envío del formulario de recuerdo de contraseña, en el cual se hace una petición AJAX al servidor para que envíe un email al usuario con el enlace para recuperar la contraseña.

		*__NewPasswordPage__ : Contenedor encargado de definir las funciones necesarias para el tratamiento de los datos del formulario (onChange) y el tratamiento del envío del formulario de nueva contraseña, en el cual se hace una petición AJAX al servidor para que cambie la contraseña del usuario que la está solicitando.

		*__Profile__ : Contenedor encargado de definir las funciones necesarias para el tratamiento de los datos del formulario (onChange) y el tratamiento del envío del formulario para el cambio de perfil, en el cual se hace una petición AJAX al servidor para que cambie los campos nombre, email y contraseña si procede del usuario.

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

		5) Se asigna un middleware (pasarela) a la ruta api para asegurarse que solo acceden clientes autenticados la ruta /api.

	Ficheros útiles para passport (autenticación)
	---------------------------------------------

	Dentro del directorio server/passport se encuentran los ficheros necesarios para manejar las estrategias de inicio de sesión y registro de un usuario:

		*__local-login.js__ : En este fichero se crea una nueva estrategia para passport en la cual se configura dicha estrategia, se comprueba si el email introducido junto con su contraseña son válidos y en dicho caso se crea el token con la clave secreta del fichero config_json, el identificador de usuario y una cabecera.

		*__local-signup.js__ : En este fichero lo que se realiza es una nueva estraegia para almacenar un nuevo usuario registrado, para ello obtiene los datos del usuario que se ha registrado y se almacena en la base de datos.

	Dentro del fichero server/middleware se ha creado el fichero auth-check.js encargado de comprobar si un cliente está logueado y en dicho caso dar paso a la petición hacia la api definida en el fichero index.js del servidor

	Ficheros de rutas para peticiones
	---------------------------------
	
	Dentro del directorio server/routes se encuentran los ficheros con los métodos get y post definidos en el servidor. 

	Para el fichero api se ha definido un middleware con la idea de que cada vez que se envíe una peticion a algunos de sus métodos, la peticion previamente pase por auth-check.js verificando que el usuario está autorizado para aceder. Este middleware añade el identificador de usuario en la peticion para que podamos procesar dicho usuario en los metodos de la ruta api si procede.

	En el fichero auth.js se definen los métodos que atienden las peticiones necesarias para la autenticación de un usuario.

	Existen los siguientes metodos del servidor:

		*__/auth/login__* : Método post encargado de verificar si un usuario puede hacer o no login. Utilizará la estrategia local-login para verificarlo. Devuelve un mensaje JSON con un campo success y un campo mensaje con el texto de dicha respuesta. Además si el usuario se autentica correctamente se devolverá en dicho mensaje el token creado, su nombre de usuario y su email.
		Recibe como parámetros el email(email) y la contraseña sin encriptar (password)

		*__/auth/forgot__* : Método post en el cual, si no ha habido error, (es decir, si el correo existe), se añadirá un token aleatorio al usuario con dicho usuario, junto con una fecha de expiracion de ese token. Depués se enviará un email a dicho corre electrónico con la url a la que tiene que acceder para poder cambiar la contraseña antes de 1 hora.
		Recibe como parámetros el email del usuario a recordar la contraseña (email).
	
		*__/auth/reset/:token__* : Método post en el cual, si no ha habido error (las contraseñas introducidas coinciden y están entre 8 y 15 carácteres), se comprueba si el token pasado por la url coincide y no ha expirado. En dicho caso se cambia la contraseña de dicho usuario y se le envía un correo electrónico de confirmación.
		Recibe como parámetros la nueva contraseña (password) y la confirmacion (confir_password)

		*__/api/changeProfile__* : Método post, al cual solo se puede acceder si estamos autenticados, donde si no ha habido error (El formulario de cambio de perfil es correcto, es decir, está relleno correctamente y las constrañas, si proceden, coinciden) se comprueba si la contraseña actual es correcta y si el nuevo email no existe ya en la base de datos. En el caso de haber introducido una nueva contraseña, esta se cambiará, en caso contrario se mantendrá la contraseña actual. Se cambiará el usuario que ya está autenticado.
		Recibe como parámetros el nombre de usuario (name), el email (email), la contraseña actual (password), la nueva contraseña (new_password) y la confirmación (confir_new_password)



	Test de las peticiones del servidor
	-----------------------------------
	Para realizar los test de las diferentes rutas post y get definidas en los ficheros auth y api del servidor se ha utilizado la librería chai-http y se han realizado los siguientes test:

	*__/auth/login__*
		1) Comprueba si introduciendo el email y la contraseña correctas podemos hacer login recibimos un 200 OK.
		2) Comprueba si introduciendo un email correcto pero una contraseña incorrecta recibimos un 400 y no podemos hacer login.
		3) Comprueba si introduciendo un email incorrecto pero una contraseña correcta recibimos un 400 y no podemos hacer login.
	
	*__/auth/forgot__*
		1) Comprueba que si introducimos un email correcto nos devuelve un 200 OK, enviando un correo electrónico al email suministrado.
		2) Comprueba que si introducimos un email incorrecto nos devuevel un 400 Bad Request y no envía un correo electrónico al email suministrado.

	*__/auth/reset/:token__*
		1) Comprueba que si las contraseñas son correctas, recibimos un 200 OK y se cambian correctamente.
		2) Comprueba que si las contraseñas no coinciden, recibimos un 400 Bad Request y no se cambia.
		3) Comprueba que si las contraseñas son mas cortas de 8 carácteres recibimos un 400 Bad Request y no se cambia.
		4) Comprueba que si las contraseñas son mas largas de 15 carácteres recibimos un 400 Bad Request y no se cambia.
		5) Comprueba que si las contraseñas están vacías recibimos un 400 Bad Request y no se cambia.
		6) Comprueba que si las contraseñas son validas, se envía un email y despues podemos hacer login con la nueva contraseña.

	*__/api/changeProfile__*
		1) Comprueba que si hacemos login correctamente, e introducimos el nombre y el email, junto con la contraseña actual correcamnte, se cambian el nombre y el email.
		2) Comprueba que aunque hagamos login correctamente si la contraseña actual no lo es no se hace nada.
		3) Comprueba que si la contraseña nueva es mas corta de 8 carácteres da error y no se cambia.
		4) Comprueba que si la contraseña actual está en blanco no se cambia
		5) Comprueba que si no hacemos login correctamente no podemos acceder a la ruta /api/changeProfile.
		6) Comprueba que si todo es correcto también se cambia la contraseña.
		7) Comprueba que si las nuevas contraseñas no coinciden, devuelve error y no se cambia.
		8) Comprueba que no debería cambiar la contraseña si los campos de nueva contraseña están vacíos.
		9) Comprueba que si los campos del formualario están vacíos debe salir un error y no cambiar nada.
		

Ficheros de configuración
=========================

	Fichero .gitignore
	------------------
	En este fichero se definen que fichero y directorios no se deben subir a gitHub.

	Fichero .travis.yml
	-------------------
	Fichero de configuración de travis para los test. En este fichero se le dice a travis qué necesita hacer antes de realizar los tests

	Package.json
	------------
	Fichero que contiene las librerías necesarias para el proyecto, tanto para el modo de desarrollo como para el modo de produccion. 
	Además contiene los scripts necesarios para el testeo y arranque de la aplicación

	webpack.config.js
	-----------------
	Fichero para la configuración de webpack. 
	Se le da el fichero de entrada, la ruta de salida del fichero creado y su nombre.
	También contiene los preset necesarios para realizar la transpilación de React.

	config/config.json
	------------------
	En este fichero se definen los nombres de las bases de datos para los test, el desarrollo y el testeo, junto con el nombre de usuario y la contraseña que tendrá acceso a esas bases de datos.
	También contiene el correo electrónico y la contraseña desde la cual se enviarán los correos de recordatorio de contraseña.






