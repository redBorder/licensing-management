module.exports = function (sequelize){
	//Importamos todos los modelos, hacemos las relaciones entre ellos y los devolvemos
	const User = require('./user')(sequelize);
	const Organization = require('./Organization')(sequelize);
	User.belongsTo(Organization);
	Organization.hasMany(User);
	return {
		User: User,
		Organization: Organization
	};
};