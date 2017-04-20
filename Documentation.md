Estructura de la aplicación
===========================

		.
		├── README.md
		├── .travis.yml
		├── .gitignore
		├── package.json
		├── webpack.config.js
		├── config
		│	└── config.json
		├── client
		│	│── src
		│	│	├── components
		│	│	│	 ├──Base.jsx
		│	│	│	 ├──CreateUserForm.jsx
		│	│	│	 ├──DashBoard.jsx
		│	│	│	 ├──EditUserForm.jsx
		│	│	│	 ├──ForgotForm.jsx
		│	│	│	 ├──Home.jsx
		│	│	│	 ├──ListUsers.jsx
		│	│	│	 ├──LoginForm.jsx		
		│	│	│	 ├──NewPasswordForm.jsx
		│	│	│	 └──ProfileForm.jsx
		│	│	├── containers
		│	│	│	 ├──BasePage.jsx
		│	│	│	 ├──CreateUserPage.jsx
		│	│	│	 ├──DashBoardPage.jsx
		│	│	│	 ├──EditUserPage.jsx
		│	│	│	 ├──ForgotPage.jsx
		│	│	│	 ├──HomePage.jsx
		│	│	│	 ├──ListUsersPage.jsx
		│	│	│	 ├──LoginPage.jsx		
		│	│	│	 ├──NewPasswordPage.jsx
		│	│	│	 ├──ProfilePage.jsx
		│	│	│	 └──RemoveUserPage.jsx
		│	│	└── modules
		│	│		 └──Auth.jsx
		│	├──Base.jsx
		│	├──Dashboard.jsx
		│	├──Home.jsx
		│	└──LoginForm.jsx
		├── server
		│	├── index.js
		│	├── routes
		│	│	├── api.jsx
		│	│	└── auth.js		
		│	├── db
		│	│	└── index.js
		│	├── static
		│	│	├── css
		│	│	│	└── style.css
		│	│	└── index.html
		│	├── models
		│	│	├── licenses.js
		│	│	├── organization.js
		│	│	├── user.js
		│	│	└── index.js
		│	│── passport
		│	│	├── local-login.js
		│	│	└── local-signup.js
		│	│── static
		│	│	└── ficheros estaticos (css y html)	
		│	└── middleware
		│		└── auth-check.js		
		└── test
			│── models
			│	├── relations_licenses_org.test.js
			│	└── relations_user_org.test.js
			│── models
			│	├── model_licenses.test.js			
			│	├── model_organization.test.js
			│	└── model_user.test.js
			│── routes
			│	├── change_profile_server.test.js
			│	├── login_server.test.js
			│	├── reset_server.test.js
			│	└── forgot_server.test.js
			└── fixtures
				└── fixtures.json



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
* __nodemailer__ : Librería para poder enviar correos electrónicos.
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


Inicialización de la base de datos mediante Sequelize
=====================================================

En el directorio ./server/db se realiza la configuración de sequelize según el fichero config/config.json. Se exporta el objeto sequelize para realizar la inicializacion de la base de datos en los diferentes ficheros donde sea necesaria.


La información relevante para esta cofiguración del fichero config/config.json ces la siguiente:

1) Qué gestor de bases de datos se usará

2) Qué base de datos concreta se usará

3) El nombre de usuario y la contraseña del dueño (o quién usará esa base de datos)

4) Un booleano para indicar si queremo que haya o no haya loggs por pantalla cada vez que realicemos una operacion en la BD

Para llevar a cabo el uso de los modelos hay que importar primero el objeto Sequelize (la configuración dependerá del valor de la variable de entorno MODE_RUN). 

Una vez importado el modelo hay que importar los modelos (./server/models) pasándole el objeto sequelize.

Finalmente para que se sincronicen los objetos y así poder usarlos hay que llamar al metodo sync del objeto sequelize que se ha configurado en los dos pasos anteriores

Ejemplo de uso:
---------------

```node
//Inicializamos sequelize
const sequelize = require('./db').sequelize;

//Cargamos los diferentes modelos
const models = require('./models')(sequelize);

//Sincronizamos los modelos a la base de datos
	sequelize.sync({force:true});
```

Definición de modelos
===================================

En el directorio ./server/models existen los modelos que existen en la base de datos (user.js, organizations.js y licenses.js) y un fichero index encargado de realizar todas las relaciones entre ellos y exportarlos para que puedan ser usados a lo largo de la aplicación.


Definición del modelo usuario
-----------------------------

En el directorio /server/models existe el fichero user.js el cual define el modelo para un usuario.

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
--------------------

En el directorio test/models se encuentra el fichero model_user.test.js encargado de realizar los siguientes test:
		
1) Comprobar que cada vez que se inicia en el modo test la tabla users está vacía.

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

Definición del modelo Organización
----------------------------------

En el directorio /server/models existe el fichero organization.js el cual define el modelo para una organización.

En este fichero se definen todos los campos de una organizacion (id, nombre y email) y se comprueban las restricciones (que no estén vacíos, que sean válidos...).
Además se definine el método setter email para almacenar siempre el email en minúsuculas.

En cuanto a los métodos de clase se han creado los siguientes:
1) findByEmail, funcion asíncrona encargada de buscar una organización por su email.
	Esta función acepta como parámetros lso siguientes campos:
		-email: Email con el que buscar la organización.
		-done: Función de CallBack la cual tendrá dos parámetros, el primero es el error y el segundo es la organización encontrada.



Test del modelo Organización
----------------------------

En el directorio test/models se encuentra el fichero model_organization.test.js encargado de realizar los siguientes test:
		
1) Comprobar que cada vez que se inicia en el modo test la tabla organiations está vacía.

2) Comprobar que cuando añadimos una organización, solo se añade una.

3) Comprobar que si el email es invalido no se crea la organización.

4) Comprobar que si el nombre está vacío no se crea la organización.

5) Comprobar que si el email está vacío no se crea la organización.

6) Comprobar que cuando se crea una organización se crea con los parámetros adecuados.

Test de las relaciones entre User-Organization
-----------------------------------------------
En el directorio test/relations se encuentra el fichero relations_user_org.test.js encargado de realizar los siguientes test:

1) Comprobar que se puede crear una organización con dos usuarios.

2) Comprobar que se puede crear una organización sin usuarios.

3) Comprobar que se puede añadir un usuario sin organización.


Definición del modelo Licencias
----------------------------------

En el directorio server/models existe el fichero licenses.js el cual define el modelo para una licencia.

En este fichero se definen todos los campos de una licencia (cluster_id y expires_at) y se comprueban las restricciones (que sean válidos y no estén vacíos).



Test del modelo Licencias
----------------------------

En el directorio test/models se encuentra el fichero model_licenses.test.js encargado de realizar los siguientes test:
		
1) Comprobar que cada vez que se inicia en el modo test la tabla licenses está vacía.

2) Comprobar que si el campo OrganizationId está vacío no se crea la licencia.

3) Comprobar que si el campo OrganizationId no existe en la tabla organización no se crea la licencia.

4) Comprobar que si el identificador de organización existe, se puede crear la licencia.


Test de las relaciones entre Licenses-Organization
-----------------------------------------------
En el directorio test/relations se encuentra el fichero relations_user_org.test.js encargado de realizar los siguientes test:

1) Comprobar que se puede crear una organización sin licencias.

2) Comprobar que se puede crear una organización con varias licencias.



Ficheros del cliente
====================
	
Principales ficheros del cliente
--------------------------------
En el lado del cliente existen 3 ficheros principales:
* __App.jsx__ : Fichero encargado de crear el componente principal de la aplicación, el cual incluirá a todos los demás elementos de forma recursiva, es decir es el componente padre de todos. Dentro de él se hace uso de react-router mediante el componente router, al cual se le pasan las rutas definidas en el fichero routes.js
* __index.jsx__ : Fichero de entrada para webpack. Es el encargado de interpretar el componente App dentro del ficheroHTML de la página web.
* __routes.js__ : Fichero que contiene las rutas necesarias para react router. Cuando se accede a alguna ruta definida en dicho fichero, se creará un componente BasePage cuyo hijo será el que haga mach con esa ruta.

Componentes JSX de la aplicación
--------------------------------
Dentro del directorio client/src/components se encuentran los siguientes componentes:
* __Base__ : Componente principal de la aplicación. Es el encargado de mostrar la barra de navegación con losdiferentes enlaces a las diferentes rutas. Acepta como propiedad 'children', la cual será el componente a mostrardebajo de la barra de navegación del componente base. 

* __Home__ : Componente encargado de mostrar la página principal de la aplicación a los usuarios que no están loguados.Acepta como propiedades un mensaje de éxito, el cuál será mostrado si existe dicho mensaje.

* __Dashboard__ : Componente encargado de mostrar la página principal una vez que un usuario está logueado. Acepta comopropiedad una cadena de caráteres que será una frase secreta sólo visible si estás logueado.

* __LoginForm__ : Componente encargado de crear el formulario de inicio de sesión. Acepta como propiedades lasfunciones 'onChange', encargada de manejar los campos que van cambiando, 'onSubmit', encargada de manejar cuando seenvía el formulario, 'errors', objeto encargado de almacenar los errores para cada campo además de un resumen (summary y por último 'user', objeto encargado de almacenar los valores suministrados en el formulario. 

* __ForgotForm__ : Componente encargado de mostrar el formulario para el recordatorio de la contraseña. Este formulariosolo pedirá en email, y en el caso de haber algún error lo mostrará. 

* __NewPasswordFormForm__ : Componente encargado de mostrar el formulario para el cambio de la contraeña olvidada. Esteformulario contendrá la nueva contraseña junto con un campo de verificacion de la nueva contraseña. 

* __ProfileForm__ : Componente encargado de mostrar el formulario para el cambio del perfil de un usario. Esteformulario contendrá el nombre del usuario, el email, la nueva contraseña y la contraseña actual.

* __CreateUser__ : Componente encargado de mostrar el formulario para crear un usuario. Este formulario contendrá un nombre, un email, una contraseña con su confirmación, una lista de todas las organizaciones disponibles y un checkbox para marcar el usuario como administrador o no.

* __EditUserForm__ : Componente encargado de mostrar el formulario editar un usuario. Este formulario contendrá los campos para el nombre, el email y la organización a la que pertenecerá dicho usuario junto con un campo de 'checkbox' para indicar si es o no administrador.

* __ListUser__ : Componente encargado de mostrar un listado de todos los usuario existentes. Aceptará como parámetros una tabla de objetos de tipo User. Se mapeará la lista de usuarios mostrando el nombre, el email y su rol. Además dispondrá de dos botones para la edición o el borrado de dicho usuario.

* __ListOrgs__ : Componente encargado de mostrar un listado de todos los usuario existentes. Aceptará como parámetros una tabla de objetos de tipo Organization. Se mapeará la lista de organizaciones, mostrando su nombre y su email. Además dispondrá de un boton para la eliminación de una organización.

Contenedores JSX de la aplicación
---------------------------------

La principal diferencia entre los Componentes (conocidos en inglés como Presentational Component) y los contenedores radica en que los componentes interpretan directamente los componentes JSX que se encuentran definidos en ellos (Es decir, cómo se ven las cosas), mientras que los contenedores se encargan de tratar los datos, utilizar funciones y pasársela a los componentes (Cómo se hacen las cosas).

En esta aplicación los contenedores se encuentran en el directorio client/src/containers y son los siguientes:

* __BasePage__ : Contenedor encargado de gestionar el componente Base, de momento no le hace ningún cambio.

* __HomePage__ : Contenedor encargado de mostrar el componente Home. Obtiene, si procede, el mensaja de éxito del almacenamiento local, lo elimina y se lo pasa al componente para que lo muestre.

* __DashboardPage__ : Contenedor encargado de gestionar el componente Dashboard. Obtiene el nombre y el email del usuario logueado del almacenamiento local del navegador (previamente se ha almacenado en LoginPage) para escribir un mensaje personal y pasárselo a Base como secretMessage.

* __LoginPage__ : Contenedor encargado de definir las funciones necesarias para el tratamiento de los datos del formulario (onChange) y el tratamiento del envío del formulario, en el cual se hace una petición AJAX al servidor para que autorice/deniegue al usuarío, almacenando el token si se le permite el acceso.

* __ForgotPage__ : Contenedor encargado de definir las funciones necesarias para el tratamiento de los datos del formulario (onChange) y el tratamiento del envío del formulario de recuerdo de contraseña, en el cual se hace una petición AJAX al servidor para que envíe un email al usuario con el enlace para recuperar la contraseña.

* __NewPasswordPage__ : Contenedor encargado de definir las funciones necesarias para el tratamiento de los datos del formulario (onChange) y el tratamiento del envío del formulario de nueva contraseña, en el cual se hace una petición AJAX al servidor para que cambie la contraseña del usuario que la está solicitando.

* __Profile__ : Contenedor encargado de definir las funciones necesarias para el tratamiento de los datos del formulario (onChange) y el tratamiento del envío del formulario para el cambio de perfil, en el cual se hace una petición AJAX al servidor para que cambie los campos nombre, email y contraseña si procede del usuario.

* __CreateUserPage__ : Contenedor encargado de definir las funciones necesarias para el tratamiento de los datos del formulario (onChange) y el tratamiento del envío del formulario para el registro de un nuevo usuario, en el cual se hace una petición AJAX al servidor para que se cree un usuario con los datos suministrados en el formulario. Realiza también la consulta al la lista de las organizaciones

* __EditUserPage__ : Contenedor encargado de definir las funciones necesarias para el tratamiento de los datos del formulario (control de cambios y validación) de edición de usuario. Se realiazará una petición AJAX al servidor para que trate los datos de edición de un usuario el enviar el formulario.

* __ListUsersPage__ : Contenedor encargado de realizar una peticion AJAX justamente antes de realizar la interpretación del componente ListUsers para obtener los usuarios y suministrarselo al componente para que los muestre. En él se define la función encargada de eliminar un usuario. Esta función será llamada desde la lista de usuarios al hacer click en el boton de eliminar. Recibe como parámetros el id, nombre y email del usuario a eliminar. Realiza una petición a la api para eliminar un usuario y recarga la página para volver a obtener la nueva lista de usuarios.


* __ListOrgsPage__ : Contenedor encargado de realizar una peticion AJAX justamente antes de realizar la interpretación del componente ListOrgs para obtener las organizaciones y suministrarselas al componente para que los muestre. En él se define la función encargada de eliminar una organización. Esta función será llamada desde la lista de organizaciones al hacer click en el botón de eliminar. Recibirá como parámetros el identificador, nombre e email de una organización. Mostrará un mensaje de aviso y eliminará la organización de la base datos cambiando todos sus usuarios a no pertenecientes a ninguna organización.

Ficheros utiles para la autenticacion en el lado del cliente
------------------------------------------------------------

Dentro del directorio client/modules se encuentra el fichero Auth.js que posee metodos necesarios para almacenar el token de un usuario una vez registrado (authenticateUser), comprobar si un usuario está logueado, es decir si existe el token (isUserAuthenticated), desautenticar a un usuario borrando su token (deauthenticateUser), un metodo para recuperar el token (getToken) y para comprobar si un usuario logueado es administrador (isAdmin).

	

Ficheros del servidor
====================
	
Principales ficheros del servidor
--------------------------------

En el lado del servidor existe 1 fichero principal, el fichero index.js, el cual es el fichero al que accede el servidor al arrancarse en el se reliza lo siguiente:
	
1) Se inicializa sequelize, se añaden los modelos y se sincroniza en función de la variable de entorno. Si estamos en el modo de produción y no existe ningún usuario de tipo administrador se creará uno nuevo con el correo admin@redborder.com y la contraseña adminadmin por defecto.
		
2) Se definen las rutas estáticas para el servidor

3) Se definen las estrategias para la librería passport de autenticación

4) Se definen las rutas disponibles en el servidor (auth y api)

5) Se asigna un middleware (pasarela) a la ruta api para asegurarse que solo acceden clientes autenticados la ruta /api.

Ficheros útiles para passport (autenticación)
---------------------------------------------

Dentro del directorio server/passport se encuentran los ficheros necesarios para manejar las estrategias de inicio de sesión y registro de un usuario:

* __local-login.js__ 
En este fichero se crea una nueva estrategia para passport en la cual se configura dicha estrategia, se comprueba si el email introducido junto con su contraseña son válidos y en dicho caso se crea el token con la clave secreta del fichero config_json, el identificador de usuario y una cabecera.

* __local-signup.js__ 
En este fichero lo que se realiza es una nueva estrategia para almacenar un nuevo usuario registrado, para ello obtiene los datos del usuario que se ha registrado y se almacena en la base de datos.

Dentro del fichero server/middleware se ha creado el fichero auth-check.js encargado de comprobar si un cliente está logueado y en dicho caso dar paso a la petición hacia la api definida en el fichero index.js del servidor

Ficheros de rutas para peticiones
---------------------------------
	
Dentro del directorio server/routes se encuentran los ficheros con los métodos get y post definidos en el servidor. 

Para el fichero api se ha definido un middleware con la idea de que cada vez que se envíe una peticion a algunos de sus métodos, la peticion previamente pase por auth-check.js verificando que el usuario está autorizado para aceder. Este middleware añade el identificador de usuario en la peticion para que podamos procesar dicho usuario en los metodos de la ruta api si procede.

En el fichero auth.js se definen los métodos que atienden las peticiones necesarias para la autenticación de un usuario.

Existen los siguientes metodos del servidor:

* __/auth/login__*  : 
Método post encargado de verificar si un usuario puede hacer o no login. Utilizará la estrategia local-login para verificarlo. Devuelve un mensaje JSON con un campo success y un campo mensaje con el texto de dicha respuesta. Además si el usuario se autentica correctamente se devolverá en dicho mensaje el token creado, su nombre de usuario y su email.
	Recibe como parámetros el email(email) y la contraseña sin encriptar (password)

* __/auth/forgot__*  : 
Método post en el cual, si no ha habido error, (es decir, si el correo existe), se añadirá un token aleatorio al usuario con dicho usuario, junto con una fecha de expiracion de ese token. Depués se enviará un email a dicho corre electrónico con la url a la que tiene que acceder para poder cambiar la contraseña antes de 1 hora.
		Recibe como parámetros el email del usuario a recordar la contraseña (email).
	
* __/auth/reset/:token__*  : 
Método post en el cual, si no ha habido error (las contraseñas introducidas coinciden y están entre 8 y 15 carácteres), se comprueba si el token pasado por la url coincide y no ha expirado. En dicho caso se cambia la contraseña de dicho usuario y se le envía un correo electrónico de confirmación.
Recibe como parámetros la nueva contraseña (password) y la confirmacion (confir_password)

* __/api/changeProfile__*  : 

Método post, al cual solo se puede acceder si estamos autenticados, donde si no ha habido error (El formulario de cambio de perfil es correcto, es decir, está relleno correctamente y las contraseñas, si proceden, coinciden) se comprueba si la contraseña actual es correcta y si el nuevo email no existe ya en la base de datos. En el caso de haber introducido una nueva contraseña, esta se cambiará, en caso contrario se mantendrá la contraseña actual. Se cambiará el usuario que ya está autenticado.
	Recibe como parámetros el nombre de usuario (name), el email (email), la contraseña actual (password), la nueva contraseña (new_password) y la confirmación (confir_new_password)

* __/api/users__*  : 

Método post, al cual solo se puede acceder si estamos autenticados, donde si no ha habido error (El formulario de creación de un usuario es correcto, es decir, está relleno correctamente y las contraseñas coinciden) se comprueba si la el usuario logueado realmente tiene permisos de usuarios, entonces se creará un usuario en la base de datos haciendo uso de passport.
	Recibe como parámetros el nombre de usuario (name), el email (email), ls contraseña (new_password) y la confirmación (confir_new_password), la organización a la que pertenece y si es administrador o no.


* __/api/organizations*  : 

Método post, al cual solo se puede acceder si estamos autenticados, donde si no ha habido error (El formulario de creación de una organización es correcto) se comprueba si la el usuario logueado realmente tiene permisos de usuarios, entonces se creará una organización en la base de datos haciendo uso de passport.
	Recibe como parámetros el nombre de usuario (name), el email (email), y un identificador de cluster.

* __api/users/:page__* :

Método get, el cual se encarga de devolver en un fichero JSON los usuarios que se hayan registrados en la base de datos.
Sólo devolverán los usuarios si el usuario autenticado es de tipo admin. Utiliza la paginación de forma que según el numero de pagina (page) devolverá los 10 primeros, los 10 segundos... usuarios ordenados por el nombre.
Devolverá también el numero de usuarios existentes en la base de datos (number_users)

* __api/organizations/:page__* :

Método get, el cual se encarga de devolver en un fichero JSON las organizaciones que se hayan registradas en la base de datos.
Sólo devolverán las organizaciones si el usuario autenticado es de tipo admin. Utiliza la paginación de forma que según el número de pagina (page) devolverá las 10 primeras, las 10 segundss... organizaciones ordenadas por el nombre.
Devolverá también el numero de organizaciones existentes en la base de datos (number_orgs)

* __api/users/:id__* :

Método delete, al cual solo se puede acceder si estamos autenticados y además somo administradores porque dentro de él se comprueba si el usuario que solicita eliminar un usuario es de tipo admin. 
Este método elimina el usuario cuyo identificador se le ha enviado como parámetro en la url de la petición en el caso de que exista. Devuelve un objeto JSON con un parámetro de éxito (success) además del mensaje de exito o error.

* __api/organizations/:id__* :

Método delete, al cual solo se puede acceder si estamos autenticados y además somo administradores ya que dentro de él se comprueba si el usuario que solicita eliminar una organización es de tipo admin. 
Este método elimina la organización cuyo identificador se le ha enviado como parámetro en la url de la petición en el caso de que exista. Devuelve un objeto JSON con un parámetro de éxito (success) además del mensaje de exito o error.

* __api/users/:id__* :

Método put, al cual solo se puede acceder si estamos autenticados y además somo administradores porque dentro de él se comprueba si el usuario que solicita modificar un usuario es de tipo admin.
Modifica el usuario cuyo identificador coincide con el parámetro que se le ha enviado en la url de la petición. 
Recibe como parámetros de la petición post el nuevo nombre, email, rol y organización a la que pertenecerá el usuario que queremos modificar.
Devuelve un objeto JSON con un parámetro de éxito (success) además de un mensaje de éxito o fracaso y el usuario modificado.

* __api/organizations/:id__* :

Método put, al cual solo se puede acceder si estamos autenticados y además somo administradores porque dentro de él se comprueba si el usuario que solicita modificar una organización es de tipo admin.
Modifica la organización cuyo identificador coincide con el parámetro que se le ha enviado en la url de la petición. 
Recibe como parámetros de la petición post el nuevo nombre, email y el cluster id de la organización que se quiere modificar.
Devuelve un objeto JSON con un parámetro de éxito (success) además de un mensaje de éxito o fracaso y la organización modificado.

Test de las peticiones del servidor
-----------------------------------
Para realizar los test de las diferentes rutas post y get definidas en los ficheros auth y api del servidor se ha utilizado la librería chai-http, se han definido datos de pruebas en el fichero ./test/fixtures/fixtures.json y se han realizado los siguientes test:

* __/auth/login__* :

En el fichero ./test/routes/login_server.test.js:

1) Comprueba si introduciendo el email y la contraseña correctas podemos hacer login recibimos un 200 OK.

2) Comprueba si introduciendo un email correcto pero una contraseña incorrecta recibimos un 400 y no podemos hacer login.

3) Comprueba si introduciendo un email incorrecto pero una contraseña correcta recibimos un 400 y no podemos hacer login.

	
* __/auth/forgot__* :

En el fichero ./test/routes/forgot_server.test.js:

1) Comprueba que si introducimos un email correcto nos devuelve un 200 OK, enviando un correo electrónico al email suministrado.

2) Comprueba que si introducimos un email incorrecto nos devuevel un 400 Bad Request y no envía un correo electrónico al email suministrado.


* __/auth/reset/:token__* :

En el fichero ./test/routes/reset_server.test.js:

1) Comprueba que si las contraseñas son correctas, recibimos un 200 OK y se cambian correctamente.

2) Comprueba que si las contraseñas no coinciden, recibimos un 400 Bad Request y no se cambia.

3) Comprueba que si las contraseñas son mas cortas de 8 carácteres recibimos un 400 Bad Request y no se cambia.

4) Comprueba que si las contraseñas son mas largas de 15 carácteres recibimos un 400 Bad Request y no se cambia.

5) Comprueba que si las contraseñas están vacías recibimos un 400 Bad Request y no se cambia.

6) Comprueba que si las contraseñas son validas, se envía un email y despues podemos hacer login con la nueva contraseña.


* __/api/changeProfile__* :

En el fichero ./test/routes/change_profile_server.test.js:

1) Comprueba que si hacemos login correctamente, e introducimos el nombre y el email, junto con la contraseña actual correcamnte, se cambian el nombre y el email.

2) Comprueba que aunque hagamos login correctamente si la contraseña actual no lo es no se hace nada.

3) Comprueba que si la contraseña nueva es mas corta de 8 carácteres da error y no se cambia.

4) Comprueba que si la contraseña actual está en blanco no se cambia

5) Comprueba que si no hacemos login correctamente no podemos acceder a la ruta /api/changeProfile.

6) Comprueba que si todo es correcto también se cambia la contraseña.

7) Comprueba que si las nuevas contraseñas no coinciden, devuelve error y no se cambia.

8) Comprueba que no debería cambiar la contraseña si los campos de nueva contraseña están vacíos.

9) Comprueba que si los campos del formualario están vacíos debe salir un error y no cambiar nada.

* __/api/createUser* : 

En el fichero ./test/routes/create_user_server.test.js:

1) Comprueba que un usuario administrador autenticado puede crear un usuario.

2) Comprueba que un usuario normal autenticado NO puede crear un usuario.

3) Comprueba que el usuario se ha creado correctamente y podemos loguearnos.

* __/api/listUsers__* :

En el fichero ./test/routes/list_user_server.test.js:

1) Comprueba que si estamos autenticados con un usuario administrador podemos obtener la lista de usuarios existentes.

2) Comprueba que si estamos autenticados con un usuario NORMAL no podemos obtener la lista de usuarios existentes.

* __/api/removeOrg/:id__* :

En el fichero ./test/routes/delete_org_server.test.js:

1) Comprueba que si estamos autenticados con un usuario administrador podemos eliminar una organización.

2) Comprueba que si estamos autenticados con un usuario NORMAL no podemos eliminar una organización.

3) Comprueba que si la organización a eliminar no existe, se notifica el error.

* __/api/removeUser/:id__* :

En el fichero ./test/routes/delete_user_server.test.js:

1) Comprueba que si estamos autenticados con un usuario administrador podemos eliminar un usuario.

2) Comprueba que si estamos autenticados con un usuario NORMAL no podemos eliminar un usuario.

3) Comprueba que si el usuario a eliminar no existe, se notifica el error.


* __/api/editUsersAdmin/:id__ * :

En el fichero ./test/routes/edit_user_server.test.js:

1) Comprueba que si estamos autenticados con un usuario administrador podemos editar un usuario.

2) Comprueba que si estamos autenticados con un usuario NORMAL no podemos editar un usuario.

3) Comprueba que si el usuario a editar no existe, se notifica el error.

Ficheros de configuración
=========================

Fichero .gitignore
------------------
En este fichero se definen que fichero y directorios no se deben subir a gitHub.

Fichero .travis.yml
-------------------
Fichero de configuración de travis para los test. En este fichero se le dice a travis qué necesita hacer antes de realizarlos tests

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
En este fichero se define para desarrollo, test y producción:
1) El gestor de base de datos a utilizar.
2) El nombre de la base de datos a utilizar.
3) El host y el puerto donde estará.
4) El nombre de usuario y la contraseña del usuario que usará la base de datos.
5) Variable de tipo boolean que indica si queremos o no logs cada vez que se haga una gestión con la base de datos.
6) El servidor de correo electrónico a utilizar para enviar email.
7) El email y la contraseña desde la cuenta que se enviarán los mensajes.

Este fichero sólo se utilizará si las siguientes variables de entornos no están definidas:

1) DB_SERVER: Gestor de la base de datos a utilizar.
2) DB_NAME: Nombre de la base de datos a utilizar.
3) DB_HOST: Host donde escucha la base de datos.
4) DB_PORT: Puerto en el que escucha la base de datos.
5) DB_USER: Usuario que tendrá acceso a la base de datos.
6) DB_PASSWORD: Contraseña del usuario que tendrá acceso a la base de datos.
7) DB_LOG: Variable de tipo boolean que indica si queremos o no mensajes de logs por cada gestión con la base de datos.
8) EMAIL_SERVER: Servidor de correo electrónico desde el que se enviarán los emails.
9) EMAIL_USER: Correo electrónico desde el que enviar los correos electrónicos.
10) EMAIL_PASSWORD: Contraseña del correo electrónico desde el que se enviarán los emails.






