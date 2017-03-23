const models = require('../server/models/models');
const {NewUser, FindUserByEmail, ChangeUserPassword, VerifyUserPassword} = require('../server/utils/user_controller');
const assert = require('assert');
const passwordHash = require('password-hash');


describe('Model User', function() {
  beforeEach(function(done){
  	models.connect(models.MODE_TEST, done);
  });

  it('Should create a empty model', function(done) {
  	models.User.findAll({where: {}})
  	.then(function(Users){
		assert.equal(Users.length,0);
		done()
	}, function(err){
		done(err);
	})
  });

  it('Should create 1 user', function(done) {
  	NewUser("david", "David@prueba.com", "0987654321", "normal", function(err, NewUser){
		if(err){
			console.log("Error creating user");
			done(err);
		}
		else{
			models.User.findAll({where: {}})
  			.then(function(Users){
				assert.equal(Users.length,1);
		  		FindUserByEmail("david@prueba.com", function(err, User){
		  		if(!err){
					assert.equal(User.dataValues.name,"david");
					assert.notEqual(User.dataValues.email,"David@prueba.com"); //Inside it's on Lower case
					assert.equal(User.dataValues.email,"david@prueba.com");
					assert.notEqual(User.dataValues.password,"0987654321");
					assert.equal(User.dataValues.rol,"normal");
					VerifyUserPassword(User, "0987654321", function(err, User){
								!err ? done() : done(err)
						})
					}
					else
					done(err);
				});
		  	}, function(err){
				done(err);
			})
		}
	  });
  });

  it('Should create 1 user and change the password', function(done) {
  	NewUser("david", "David@prueba.com", "0987654321", "normal", function(err, NewUser){
		if(err){
			console.log("Error creating user");
			done(err);
		}
		else{
			models.User.findAll({where: {}})
  			.then(function(Users){
				assert.equal(Users.length,1);
		  		FindUserByEmail("david@prueba.com", function(err, User){
		  		if(!err){
		  			ChangeUserPassword(User, "0987654321", "0123456789", function(err, User_changed){
		  				if(!err){
			  				assert.equal(User_changed.dataValues.name,"david");
							assert.notEqual(User_changed.dataValues.email,"David@prueba.com"); //Inside it's on Lower case
							assert.equal(User_changed.dataValues.email,"david@prueba.com");
							assert.notEqual(User_changed.dataValues.password,"0987654321");
							assert.notEqual(User_changed.dataValues.password,"0123456789");
							assert.notEqual(passwordHash.verify("0987654321", User_changed.dataValues.hashed_password), true);
							assert.equal(User_changed.dataValues.rol,"normal");
							VerifyUserPassword(User_changed, "0123456789", function(err, User){
								!err ? done() : done(err)
						 		})
						}
						else
							done(err)
		  				})
					}
					else
					done(err);
				});
		  	}, function(err){
				done(err);
			})
		}
	  });
  });  
});
