const passwordHash = require('password-hash');
const DataTypes = require('sequelize/lib/data-types');

module.exports = function(sequelize) {
  const User = sequelize.define('User',
      { 
        id:{
            type : DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            validate: {
                isUUID: 4
            }            
        },
        name: {
            type: DataTypes.STRING,
            aallowNull: false,
            validate: {
                notEmpty: { msg: "Field name shouldn't be empty" }
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false, 
            unique: true,
            validate: {
                isEmail: { msg: "Email should be a correct email" },
                notEmpty: {msg: "Field email shouldn't be empty'"},
            }
        },
        hashed_password: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {msg: "Field password shouldn't be empty"},
                not: {args: ["wrong_password"], msg: "Format password is incorrect. Password should be between 8 and 15 alphanumeric characters"}
            }
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false, 
            validate: {
                isIn: {
                    args: [['normal', 'admin']],
                    msg: "Rol user must be normal or admin"
                    }
            }
        },
        resetPasswordToken: {
            type: DataTypes.STRING,
            allowNull: true 
        },

        resetPasswordExpires:{ 
            type: DataTypes.DATE,
            allowNull: true
        }
        
    },
    //Expansion of the model user
    {
        setterMethods   : {
            password: function(password){
                if(password.length > 15 || password.length < 8 || typeof password != "string"){
                    this.setDataValue('hashed_password', "wrong_password"); //Throws error because hashed_password is notnull
                }
                else{
                    this.setDataValue('hashed_password', passwordHash.generate(password));
                }
            },
            email: function(email){
                this.setDataValue('email', email.toLowerCase());
            }

        },
        getterMethods : {
            password: function(){
                return this.hashed_password;
            }
        },
        instanceMethods: {
            verifyPassword: function(password){
                return passwordHash.verify(password, this.hashed_password);
            },
            changePassword: function(password, new_password){
                if(passwordHash.verify(password, this.hashed_password)){
                    this.setDataValue('hashed_password', passwordHash.generate(new_password));
                    return true;
                }
                else
                    return false;
            }
        }
    });
    return User;
}