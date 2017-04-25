module.exports = function (sequelize){
	//Importamos todos los modelos, hacemos las relaciones entre ellos y los devolvemos
	const User = require('./user')(sequelize);
	const Organization = require('./organization')(sequelize);
	const License = require('./license')(sequelize);
	//Un usuario pertenece a una organización
	User.belongsTo(Organization);
	//Una oganización tiene muchos usuarios o ninguno en caso de que sea null la clave externa
	Organization.hasMany(User);
	//Una licencia es creada por un usuario ("pertenece" a un usuario). 
	//Si el usuario se borra, se pierde la referencia al usuario poniendose el campo UserId a null
	License.belongsTo(User);
	//Una licencia pertenece a una organizacion, y no puede no pertener a ninguna (no puede ser null)
	//Si una organización se borra, se borrarán todas las licencias asociadas a ella
	Organization.hasMany(License, {foreignKey: {allowNull: false}, onDelete: 'Cascade'});
	return {
		User: User,
		Organization: Organization,
		License: License
	};
};