const models = require('../server/models/models');
const {NewUser, FindUserByEmail} = require('../server/utils/user_controller');
const assert = require('assert');

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
					done();
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
