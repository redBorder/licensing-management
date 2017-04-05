const assert = require('assert');
const sequelize_fixtures = require('sequelize-fixtures');
//Incializamos sequelize
const sequelize = require('../../server/db').sequelize;
//Cargamos los modelos
const models = require('../../server/models')(sequelize);



describe('Relations between User-Organizations', function() {
  
  beforeEach(function(done){
   //Sincronizamos la base de datos
      sequelize.sync({force:true}).then(function(){
      //Cargamos los datos necesarios
      sequelize_fixtures.loadFile('test/fixtures/fixtures.json', models)
            .then(() => done())
      })
  });
  

it("Should exists an organization with users.", function(done) {
  models.Organization.findOne({
                               where: {
                                   email: "org1@cor.com"
                               }
                           })
       .then(function(Found_org){
         try{
         assert.notEqual(Found_org, null);
         assert.equal(Found_org.name, "Organizacion con usuarios");
         }catch (e){
         return done(e);
       }
         models.User.findAll({
           where: {OrganizationId: Found_org.id}
         })
         .then(function(Found_users){
           try{
             assert.equal(Found_users.length,2);
             return done();
           }catch(e){
             return done(e);
           }
         })
       }, function(err){
             return done(err); //No debe de haber error ya que devuelve una tabla vacía

      });
  });


 it("Should exists an organization without users.", function(done) {
   models.Organization.findOne({
                               where: {
                                   email: "org2@cor.com"
                               }
                           })
       .then(function(Found_org){
         try{
         assert.notEqual(Found_org, null);
         assert.equal(Found_org.name, "Organizacion sin usuarios");
         }catch (e){
         return done(e);
       }
         models.User.findAll({
           where: {OrganizationId: Found_org.id}
         })
         .then(function(Found_users){
           try{
             assert.equal(Found_users.length,0);
             return done();
           }catch(e){
             return done(e);
           }
         })
       }, function(err){
             return done(err); //No debe de haber error ya que devuelve una tabla vacía

      });
  });
});

