module.exports = function (sequelize){
	//Importamos todos los modelos, hacemos las relaciones entre ellos y los devolvemos
	const User = require('./user')(sequelize);
	const Organization = require('./organization')(sequelize);
	const Licenses = require('./licenses')(sequelize);
	//Un usuario pertenece a una organización
	User.belongsTo(Organization);
	//Una oganización tiene muchos usuarios o ninguno en caso de que sea null la clave externa
	Organization.hasMany(User);
	//Una licencia pertenece a una organización
	Licenses.belongsTo(Organization, {foreignKey: {allowNull: false}});
	//Una licencia pertenece a una organizacion, y no puede no pertener a ninguna (no puede ser null)
	Organization.hasMany(Licenses, {foreignKey: {allowNull: false}});
	return {
		User: User,
		Organization: Organization,
		Licenses: Licenses
	};
};