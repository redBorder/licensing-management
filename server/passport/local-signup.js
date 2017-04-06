const PassportLocalStrategy = require('passport-local').Strategy;

//Incializamos sequelize
const sequelize = require('../db').sequelize;

//Cargamos los modelos
const models = require('../models')(sequelize);

/**
 * Return the Passport Local Strategy object.
 */
module.exports = new PassportLocalStrategy({
  usernameField: 'email', //Por defecto busca username, pero mi usuario será el email
  passwordField: 'password', //La contraseña será el password
  session: false, 
  passReqToCallback: true //Para poder leer el nombre del body 
}, (req, email, password, done) => {
  const NewUser = models.User.build({
      name: req.body.name.trim(),
      email: email.trim(), 
      password: password.trim(),
      OrganizationId: req.body.organization=='' ? null : req.body.organization,
      role: req.body.role 
    });
  NewUser.save().then(function(NewUser) {
      return done(null);
    }, function(err){ 
      return done(err);
  });
});