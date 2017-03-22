const models = require('../models/models');
const v4 = require('node-uuid');
const passwordHash = require('password-hash');

module.exports.NewUser = (name, email, password, rol, done) => {

	const NewUser = models.User.build({
		  id: v4(), //Generate uuid automatically
		  name: name,
		  email: email.toLowerCase(), 
		  hashed_password: passwordHash.generate(password),
		  rol: rol
		})
		NewUser.save().then(function(NewUser) {
		  	done(null, NewUser)
			}, function (err) { 
         	console.log('An error occurred while save the user:', err);
         	return done(err);
        	});
}

module.exports.FindUserByEmail = (email, done) => {
	models.User.findAll({
		where: {
			email: email
		}
	}).then(function(Users){
		return done(null, Users[0]);
	}, function(err){
		return done(err);
	})
}