module.exports = function (sequelize){
	//Importamos todos los modelos, hacemos las relaciones entre ellos y los devolvemos
	const User = require('./user')(sequelize);
	return {
		User: User
	};
};