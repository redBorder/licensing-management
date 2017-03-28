const PassportLocalStrategy = require('passport-local').Strategy;
const Model = require('../models/models');

/**
 * Return the Passport Local Strategy object.
 */
module.exports = new PassportLocalStrategy({
  usernameField: 'email', //Por defecto busca username, pero mi usuario será el email
  passwordField: 'password', //La contraseña será el password
  session: false, 
  passReqToCallback: true //Para poder leer el nombre del body 
}, (req, email, password, done) => {
  const NewUser = Model.User.build({
      name: req.body.name.trim(),
      email: email.trim(), 
      password: password.trim(),
      role: "normal" //De momento todos los usuarios creados seran normales (no admin)
    });
  NewUser.save().then(function(NewUser) {
      return done(null);
    }, function(err){ 
      return done(err);
  });
});