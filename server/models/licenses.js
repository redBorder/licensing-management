const DataTypes = require('sequelize/lib/data-types');

module.exports = function(sequelize) {
  const Licenses = sequelize.define('Licenses',
      { 
        id:{
            type : DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            validate: {
                isUUID: 4
            }            
        },
        expires_at: {
            type: DataTypes.DATE,
            allowNull: false, 
            validate: {
                notEmpty: {msg: "Field expires_at shouldn't be empty'"},
            }
        }
        
    });
    return Licenses;
}