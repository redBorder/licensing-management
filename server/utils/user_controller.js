const models = require('../models/models');
const v4 = require('node-uuid');
const passwordHash = require('password-hash');

module.exports.NewUser = (name, email, password, role, done) => {

	const NewUser = models.User.build({
		  id: v4(), //Generate uuid automatically
		  name: name,
		  email: email.toLowerCase(), 
		  hashed_password: passwordHash.generate(password),
		  role: role
		})
		NewUser.save().then(function(NewUser) {
		  	done(null, NewUser)
			}, function (err) { 
         	err.message= 'An error occurred while save the user:';
         	return done(err);
        	});
}

module.exports.FindUserByEmail = (email, done) => {
	models.User.findAll({
		where: {
			email: email.toLowerCase()
		}
	}).then(function(Users){
		if(Users.length==0){
			err.message = "User not found";
			return done(err)
		}
		else
			return done(null, Users[0]);
	}, function(err){
		err.message = "Couldn't found the user"
		return done(err);
	})
}

module.exports.VerifyUserPassword = (User, password, done) => {
	if(passwordHash.verify(password, User.dataValues.hashed_password)){
		return done(null, User);
	}
	else{
		const err = new Error("Error, password it is not correct");
		return done(err);
	}
}

module.exports.ChangeUserPassword = (User, password, new_password, done) => {
	if(passwordHash.verify(password, User.dataValues.hashed_password)){
		User.dataValues.hashed_password=passwordHash.generate(new_password);
		User.save().then(function(User){
			return done(null, User)
		}, function (err){
			err.message = "Error changing user password"
			return done(err);
		})
	}
	else{
		const err = new Error("Error, current password it is not correct");
		return done(err);	
	}
}