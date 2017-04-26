const assert = require('assert');
//Incializamos sequelize
const sequelize = require('../../server/db').sequelize;
//Cargamos los modelos
const models = require('../../server/models')(sequelize);



describe('Model Licenses', function() {
	
  beforeEach(function(done){
	  //Sincronizamos la base de datos
	  sequelize.sync({force:true}).then(() => done());
  });

  it('Should create a empty models', function(done) {
  	models.License.findAll({where: {}})
  	.then(function(Licenses){
  		try{
			assert.equal(Licenses.length,0);
		} catch (e) {
			return done(e);
		}
		return done()
	}, function(err){
		return done(err);
	})
  });

  it("Shouldn't create one Licenses. OrganizationId is null", function(done) {
  	const sensors_no_json = {
  		IPS: 100,
  		Flow : 200,
  		Social : 300
  	}
  	const NewLicenses = models.License.build({
  		license_uuid: "1ed52e37-51af-4d34-b814-13a7e9b5c389",
 			expires_at: new Date(),
			limit_bytes: 1000,
			UserId : "12df8176-0813-49d1-8767-92f4d89f1ccc",
			sensors: JSON.stringify(sensors_no_json)
		});
  	NewLicenses.save().then(function(NewLicenses) {
			models.License.findAll({where: {}})
  			.then(function(Licenses){
  				try{
					assert.notEqual(Licenses.length,1);
				}catch (e){
					return done(e);
				}
				return done();
		  	}, function(err){
				return done(err);
			})
		}, function(err){ 
			try{
			assert.equal(err.message, "notNull Violation: OrganizationId cannot be null");
			}catch (e){
				return done(e);
			}
         	return done(!err);
        	});
	});

it("Shouldn't create one Licenses. OrganizationId doesn't exists", function(done) {
		const sensors_no_json = {
  		IPS: 100,
  		Flow : 200,
  		Social : 300
  	}
  	const NewLicenses = models.License.build({
  		license_uuid: "1ed52e37-51af-4d34-b814-13a7e9b5c389",
			expires_at: new Date(),
			limit_bytes: 1000,
			UserId : "12df8176-0813-49d1-8767-92f4d89f1ccc",
			OrganizationId : "22df8176-0812-59d1-8767-92f4d89f1ccc",
			sensors: JSON.stringify(sensors_no_json)
		});
  	NewLicenses.save().then(function(NewLicenses) {
			models.License.findAll({where: {}})
  			.then(function(Licenses){
  				try{
					assert.notEqual(Licenses.length,1);
				}catch (e){
					return done(e);
				}
				return done();
		  	}, function(err){
				return done(err);
			})
		}, function(err){ 
			try{
			assert.notEqual(err, null);
			}catch (e){
				return done(e);
			}
         	return done(!err);
        	});
	});

  it("Shouldn't create Licenses. UserId not exists", function(done) {
	  const NewOrganization = models.Organization.build({
		cluster_id: "1ed52e37-51af-4d34-b814-13a7e9b5c389",
		name: "Organizacion",
		email: "org@cor.com",
		sensors: "IPS;Flow;Social"
			});

	  	NewOrganization.save().
	  	then(function(NewOrganization) {
			models.Organization.findOne({
				where: {}
			})
	  		.then(function(Organization){
		  		const sensors_no_json = {
			  		IPS: 100,
			  		Flow : 200,
			  		Social : 300
			  	}
			  	const NewLicenses = models.License.build({
			  		license_uuid: "1ed52e37-51af-4d34-b814-13a7e9b5c389",
						cluster_id: "1ed52e37-51af-4d34-b814-13a7e9b5c389",
						expires_at: new Date(),
						limit_bytes: 1000,
						UserId : "12df8176-0813-49d1-8767-92f4d89f1ccc",
						OrganizationId : Organization.id,
						sensors: JSON.stringify(sensors_no_json)
					});			 
				NewLicenses.save().then(function(NewLicenses) {
					models.License.findAll({where: {}})
	  			.then(function(Licenses){
	  				try{
						assert.notEqual(Licenses.length,1);
					}catch (e){
						return done(e);
					}
					return done();
			  	}, function(err){
					return done(err);
				})
			}, function(err){ 
				try{
				assert.equal(err.message, "ER_NO_REFERENCED_ROW_2: Cannot add or update a child row: a foreign key constraint fails (`licenses_management_test`.`licenses`, CONSTRAINT `licenses_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `Users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE)");
				}catch (e){
					return done(e);
				}
	         	return done(!err);
	        	});
			});
	  });
	})

it("Should create Licenses. UserId and OrganizationId exist", function(done) {
			//Creamos la organización
	  	const NewOrganization = models.Organization.build({
			  cluster_id: "1ed52e37-51af-4d34-b814-13a7e9b5c389",
			  name: "Organizacion",
			  email: "org@cor.com",
				sensors: "IPS;Flow;Social"
			});

	  	NewOrganization.save().
	  	then(function(NewOrganization) {
			models.Organization.findOne({
				where: {}
			})
	  		.then(function(Organization){
	  			//Creamos el usuario
	  			const NewUser = models.User.build({
					  name: "David",
					  email: "David@prueba.com", 
					  password: "1234567890",
					  role: "normal"
					});
			  	NewUser.save().then(function(NewUser) {
						models.User.findOne({
							where: {}
						})
					.then(function(User){
			  		const sensors_no_json = {
				  		IPS: 100,
				  		Flow : 200,
				  		Social : 300
				  	}
				  	const NewLicenses = models.License.build({
				  		license_uuid: "1ed52e37-51af-4d34-b814-13a7e9b5c389",
							expires_at: new Date(),
							limit_bytes: 1000,
							UserId : User.id,
							OrganizationId : Organization.id,
							sensors: JSON.stringify(sensors_no_json)
						});			 
						NewLicenses.save().then(function(NewLicenses) {
							models.License.findAll({where: {}})
			  			.then(function(Licenses){
			  				try{
								assert.equal(Licenses.length,1);
								assert.equal(Licenses[0].license_uuid,"1ed52e37-51af-4d34-b814-13a7e9b5c389");
								assert.equal(Licenses[0].limit_bytes,1000);
								assert.equal(Licenses[0].UserId,User.id);
								assert.equal(Licenses[0].OrganizationId,Organization.id);
							}catch (e){
								return done(e);
							}
							return done();
					  	}, function(err){
							return done(err);
							})
						}, function(err){ 
						try{
						assert.equal(err.message, "notNull Violation: UserId cannot be null");
						}catch (e){
							return done(e);
						}
			         return done(!err);
			      });
					});
				});
			});
		});
	});

});