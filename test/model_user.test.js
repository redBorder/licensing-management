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
  		try{
			assert.equal(Users.length,0);
		} catch (e) {
			return done(e);
		}
		return done()
	}, function(err){
		return done(err);
	})
  });

  it('Should create only 1 user', function(done) {
  	NewUser("david", "David@prueba.com", "0987654321", "normal", function(err, NewUser){
		if(err){
			return done(err);
		}
		else{
			models.User.findAll({where: {}})
  			.then(function(Users){
  				try{
					assert.equal(Users.length,1);
				}catch (e){
					return done(e);
				}
				return done();
		  	}, function(err){
				return done(err);
			})
		}
	  });
  });

  it("Shouldn't create user. Role invalid", function(done) {
  	NewUser("david", "David@prueba.com", "0987654321", "invalid role", function(err, NewUser){
			models.User.findAll({where: {}})
  			.then(function(Users){
  				try{
					assert.equal(Users.length, 0);
					assert.notEqual(err, null);
				}catch (e){
					return done(e);
				}
				return done();
		  	}, function(err){
				return done(err);
			})
	  });
  });

  it("Shouldn't create user. Email invalid", function(done) {
  	NewUser("david", "invalid email", "0987654321", "admin", function(err, NewUser){
			models.User.findAll({where: {}})
  			.then(function(Users){
  				try{
					assert.equal(Users.length, 0);
					assert.notEqual(err, null);
				}catch (e){
					return done(e);
				}
				return done();
		  	}, function(err){
				return done(err);
			})
	  });
  });

  it('Should find user created', function(done) {
	  	NewUser("david", "David@prueba.com", "0987654321", "normal", function(err, NewUser){
			if(err){
				return done(err);
			}
			else{
				FindUserByEmail("david@prueba.com", function(err, User){
					try{
			  		assert.notEqual(User, null);
			  		}catch (e){
			  			return done(e);
			  		}
			  		return done();
				});
			}
		});
  });

  it('Should create one user with correct paramaters', function(done) {
  	NewUser("david", "David@prueba.com", "0987654321", "normal", function(err, NewUser){
		  FindUserByEmail("DAVID@prueba.com", function(err, User){
		  if(!err){
		  	try{
				assert.equal(NewUser.dataValues.name,"david");
				assert.notEqual(NewUser.dataValues.email,"David@prueba.com"); //Inside it's on Lower case
				assert.equal(NewUser.dataValues.email,"david@prueba.com");
				assert.notEqual(NewUser.dataValues.password,"0987654321");
				assert.equal(NewUser.dataValues.role,"normal");
			}catch(e){
				return done(e);
			}

			VerifyUserPassword(NewUser, "0987654321", function(err, User){
						return !err ? done() : done(err)
				})
			}
			else
			return done(err);
		});
	  });
  });

  it('Should create one user with correct hash password', function(done) {
  	NewUser("david", "David@prueba.com", "0987654321", "normal", function(err, NewUser){
		  FindUserByEmail("DAVID@prueba.com", function(err, User){	
		  	try{
		  		assert.equal(passwordHash.isHashed(User.dataValues.hashed_password), true);		
			}catch(e){
				return done(e);
			}

			VerifyUserPassword(NewUser, "0987654321", function(err, User){
						return !err ? done() : done(err)
				})
			});
	  });
  });


  it('Should create one user and change the password', function(done) {
  	NewUser("david", "David@prueba.com", "0987654321", "normal", function(err, NewUser){
		if(err){
			console.log("Error creating user");
			return done(err);
		}
		else{
			models.User.findAll({where: {}})
  			.then(function(Users){
  				try{
					assert.equal(Users.length,1);
				}catch(e){
					return done(e);
				}
		  		FindUserByEmail("david@prueba.com", function(err, User){
		  		if(!err){
		  			ChangeUserPassword(User, "0987654321", "0123456789", function(err, User_changed){
		  				if(!err){
		  					FindUserByEmail("david@prueba.com", function(err, User_changed_found){
		  						if(!err){
				  					try{
						  				assert.equal(User_changed_found.dataValues.name,"david");
										assert.notEqual(User_changed_found.dataValues.email,"David@prueba.com"); //Inside it's on Lower case
										assert.equal(User_changed_found.dataValues.email,"david@prueba.com");
										assert.notEqual(User_changed_found.dataValues.password,"0987654321");
										assert.notEqual(User_changed_found.dataValues.password,"0123456789");
										assert.notEqual(passwordHash.verify("0987654321", User_changed_found.dataValues.hashed_password), true);
										assert.equal(User_changed_found.dataValues.role,"normal");
										}catch (e){
											return done(e);
										}

									VerifyUserPassword(User_changed, "0123456789", function(err, User){
										return !err ?  done() : done(err);
								 		})
								}
								else
									return done(err);
							});
		  				}
						else
							return done(err)
		  				})
					}
					else
					return done(err);
				});
		  	}, function(err){
				return done(err);
			})
		}
	  });
  });  
});
