const jwt = require('jsonwebtoken');
const PassportLocalStrategy = require('passport-local').Strategy;
const config_json = require('../../config/config.json');
const MODE_RUN = process.env.MODE_RUN || "development"
const config = config_json[MODE_RUN]

//Incializamos sequelize
const sequelize = require('../db').sequelize;

//Cargamos los modelos
const models = require('../models')(sequelize);

/**
 * Return the Passport Local Strategy object.
 */
module.exports = new PassportLocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
}, (req, email, password, done) => {
  const userData = {
    email: email.trim().toLowerCase(),
    password: password.trim()
  };
  return models.User.findOne({where:{
    email: userData.email}})
  .then(function(Found_User, err){
        if(err || !Found_User){
            const error = new Error('Incorrect email or password');
            error.name = 'IncorrectCredentialsError';
            return done(error);
          }
        else{
            //Check if a hashed user's password is equal to vale saved un the database
            if(Found_User.verifyPassword(password)){
              const payload ={
                sub: Found_User.id
              };
              // create a token string
              const token = jwt.sign(payload, config.jwtSecret); //Algoritmo por defecto HS256
              const data = {
                name: Found_User.name,
                role: Found_User.role,
                id: Found_User.id,
                OrganizationId: Found_User.OrganizationId
              };
              return done(null, token, data);
            }
            else{
              const error = new Error('Incorrect email or password');
              error.name = 'IncorrectCredentialsError';
              return done(error);
            }
        }
      }, function(err){
            return done(err); 
      });
});
