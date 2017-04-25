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
  	models.Licenses.findAll({where: {}})
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
  	const NewLicenses = models.Licenses.build({
		  cluster_id: "1ed52e37-51af-4d34-b814-13a7e9b5c389",
		  expires_at: new Date()
		});
  	NewLicenses.save().then(function(NewLicenses) {
			models.Licenses.findAll({where: {}})
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
  	const NewLicenses = models.Licenses.build({
		  expires_at: new Date(),
		  OrganizationId: "not exists"
		});
  	NewLicenses.save().then(function(NewLicenses) {
			models.Licenses.findAll({where: {}})
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

  	it("Should create Licenses. OrganizationId exists", function(done) {
	  	const NewOrganization = models.Organization.build({
			  cluster_id: "1ed52e37-51af-4d34-b814-13a7e9b5c389",
			  name: "Organizacion",
			  email: "org@cor.com"
			});

	  	NewOrganization.save().
	  	then(function(NewOrganization) {
			models.Organization.findOne({
				where: {}
			})
	  		.then(function(Organization){
	  			const NewLicenses = models.Licenses.build({
				expires_at: new Date(),
				OrganizationId: Organization.id
				});
			  	NewLicenses.save().then(function(NewLicenses) {
					models.Licenses.findAll({where: {}})
	  				.then(function(Licenses){
	  					try{
							assert.equal(Licenses.length,1);
						}catch (e){
							return done(e);
						}
						return done();
			  		})
				});
	       	})
		});
	});
});