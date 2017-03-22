module.exports = function(sequelize, DataTypes) {
  return sequelize.define('User',
      { 
        id:{
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
            autoIncrement: false, //It will be uuid
            unique: true
        },
        name: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: { msg: "Field name shouldn't be empty" }
            }
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            validate: {
                isEmail: { msg: "Email should be a correct email" },
                notEmpty: {msg: "Field name shouldn't be empty'"},
            }
        },
        hashed_password: {
            type: DataTypes.STRING
        },
        rol: {
            type: DataTypes.STRING,
            validate: {
                isIn: {
                    args: [['normal', 'admin']],
                    msg: "Rol user must be normal or admin"
                    },   // check the value is one of these
                notEmpty: {msg: "Field rol shouldn't be empty'"}
            }
        }
        
    });
}