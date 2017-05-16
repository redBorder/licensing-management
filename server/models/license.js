const DataTypes = require('sequelize/lib/data-types');

module.exports = function(sequelize) {
  const License = sequelize.define('Licenses',
      { 
        id:{
            type : DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            validate: {
                isUUID: 4
            }            
        },
        license_uuid : {
            type : DataTypes.UUID,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4,
            validate : {
                notEmpty: {
                    msg: "Field licenses uuid shouldn't be empty"
                }
            }
        },
        duration: {
            type: DataTypes.INTEGER,
            allowNull: false, 
            validate: {
                notEmpty: {
                    msg: "Field duration shouldn't be empty"
                }
            }
        },
        expires_at: {
            type: DataTypes.DATE,
        },
        sensors : {
            type: DataTypes.JSON,
            allowNull: false,
            validate:{
                notEmpty: {msg: "Field sensors shouldn't be empty"}
            }
        },
        limit_bytes : {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate : {
                notEmpty: {
                    msg: "Field limit bytes shouldn't be empty"
                }
            }
        },
        enabled : {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
            validate : {
                notEmpty: {
                    msg: "Field enabled shouldn't be empty"
                }
            }
        }    
    });
    return License;
}