Estructura de la aplicación
===========================

		.
		├── README.md
		├── .travis.yml
		├── .gitignore
		├── package.json
		├── documentation.json
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
		│	│	│	 └──ProfilePage.jsx
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

Scripts de servicio:
====================

Para lanzar webpack en modo watch utilizaremos el siguiente comando
	
	$ npm run build:dev
	
Para lanzar webpack una sola vez utilizaremos el siguiente comando
	
	$ npm run build
	
Para lanzar el servidor en la dirección de localhost y puerto 3000 utilizaremos el siguiente comando
	
	$ npm run start

Para lanzar el servidor de MySql
================================

	$ sudo /usr/local/mysql/support-files/mysql.server start

Para la configuración de la base de datos y el servidor de correos
==================================================================

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






