const assert = require('assert');
//Incializamos sequelize
const sequelize = require('../../server/db').sequelize;
//Cargamos los modelos
const models = require('../../server/models')(sequelize);



describe('Model Organization', function() {
	
  beforeEach(function(done){
	  //Sincronizamos la base de datos
	  sequelize.sync({force:true}).then(() => done());
  });

  it('Should create a empty models', function(done) {
  	models.Organization.findAll({where: {}})
  	.then(function(Organizations){
  		try{
			assert.equal(Organizations.length,0);
		} catch (e) {
			return done(e);
		}
		return done()
	}, function(err){
		return done(err);
	})
  });

  it('Should create only 1 organization', function(done) {
  	const NewOrganization = models.Organization.build({
		  name: "Organizacion",
		  email: "org@cor.com"
		});
  	NewOrganization.save().then(function(NewOrganization) {
			models.Organization.findAll({where: {}})
  			.then(function(Organizations){
  				try{
					assert.equal(Organizations.length,1);
				}catch (e){
					return done(e);
				}
				return done();
		  	}, function(err){
				return done(err);
			})
		}, function(err){ 
         	return done(err);
        	});
	});

  it("Shouldn't create organization. Format email wrong", function(done) {
  	const NewOrganization = models.Organization.build({
		  name: "Organizacion",
		  email: "email_erroneo.email"
		});
  	NewOrganization.save().then(function(NewOrganization) {
			models.Organization.findAll({where: {}})
  			.then(function(Organizations){
  				try{
					assert.equal(Organizations.length, 0);
					assert.notEqual(err, null);
				}catch (e){
					return done(e);
				}
				return done();
		  	}, function(err){
				return done(err);
			})
		}, function(err){
			try{
			assert.notEqual(err,null);
			assert.equal(err.message, "Validation error: Email should be a correct email"); 
			}catch (e){
					return done(e);
				}
         	return done(!err); //Ha de haber error, si no lo hay el test no pasa
        	});
	  });

  it("Shouldn't create Organization. Name empty", function(done) {
  	const NewOrganization = models.Organization.build({
		  name: "",
		  email: "org@cor.com"
		});
  	NewOrganization.save().then(function(NewOrganization) {
			models.Organization.findAll({where: {}})
  			.then(function(Organizations){
  				try{
					assert.equal(Organizations.length, 0);
					assert.notEqual(err, null);
				}catch (e){
					return done(e);
				}
				return done();
		  	}, function(err){
				return done(err);
			})
		}, function(err){
			try{
			assert.notEqual(err,null);
			assert.equal(err.message, "Validation error: Field name shouldn't be empty"); 
			}catch (e){
					return done(e);
				}
         	return done(!err); //Ha de haber error, si no lo hay el test no pasa
        	});
	  });
  it("Shouldn't create Organization. Email empty", function(done) {
  	const NewOrganization = models.Organization.build({
		  name: "David",
		  email: ""
		});
  	NewOrganization.save().then(function(NewOrganization) {
			models.Organization.findAll({where: {}})
  			.then(function(Organizations){
  				try{
					assert.equal(Organizations.length, 0);
					assert.notEqual(err, null);
				}catch (e){
					return done(e);
				}
				return done();
		  	}, function(err){
				return done(err);
			})
		}, function(err){
			try{
			assert.notEqual(err,null);
			assert.equal(err.message, "Validation error: Email should be a correct email,\nValidation error: Field email shouldn\'t be empty\'"); 
			}catch (e){
					return done(e);
				}
         	return done(!err); //Ha de haber error, si no lo hay el test no pasa
        	});
	  });


	it("Should find Organization created by email", function(done) {
  	const NewOrganization = models.Organization.build({
		  name: "Organizacion",
		  email: "org@cor.com"
		});
  	NewOrganization.save().then(function(NewOrganization) {
  		models.Organization.findByEmail("org@cor.com", function(err, Found_org){
  			if(!err){
	  			try{
				  	assert.notEqual(Found_org, null);
				  	}catch (e){
				  		return done(e);
				  	}
				return done();
			}
			else
				return done(err)
			}, function(err){
	         	return done(err); //No ha de haber error, si no lo hay el test no pasa
	       	});
  		});
	});

	it("Should create one Organization with correct paramaters", function(done) {
  	const NewOrganization = models.Organization.build({
		  name: "Organizacion",
		  email: "org@cor.com"
		});
  	NewOrganization.save().then(function(NewOrganization) {
  		models.Organization.findByEmail("org@cor.com", function(err, Found_org){
	  			try{
	  				assert.equal(NewOrganization.getDataValue("name"),"Organizacion");
	  				assert.equal(NewOrganization.getDataValue("email"),"org@cor.com");
				  	}catch (e){
				  		return done(e);
				  	}
				return done();
			}, function(err){
	         	return done(err); //No ha de haber error, si no lo hay el test no pasa
	       	});
  		});
	});

	
});