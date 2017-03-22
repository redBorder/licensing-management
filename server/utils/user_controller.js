const models = require('../models/models');
const v4 = require('node-uuid');
const passwordHash = require('password-hash');

module.exports.NewUser = (name, email, password, rol, done) => {

	const NewUser = models.User.build({
		  id: v4(), //Generate uuid automatically
		  name: name,
		  email: email, 
		  hashed_password: passwordHash.generate(password),
		  rol: rol
		})
		NewUser.save().then(function(NewUser) {
			console.log("User saved correctly");
		  	done(null, NewUser)
			}, function (err) { 
         	console.log('An error occurred while save the user:', err);
         	return done(err);
        	});
}