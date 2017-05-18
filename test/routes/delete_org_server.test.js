const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server/index.js');
const should = chai.should();
const sequelize_fixtures = require('sequelize-fixtures');
//Incializamos sequelize
const sequelize = require('../../server/db').sequelize;
const connectDB = require('../../server/db').connectDB;

//Cargamos los modelos
const models = require('../../server/models')(sequelize);


chai.use(chaiHttp);

process.env.MODE_RUN = 'test';
process.env.NODE_ENV ='test';

describe('Remove Organization Test', function() {

  //Before each test we clean databse and load fixtures file.
  beforeEach(function(done){
        //Sincronizamos la base de datos
    sequelize.sync({force:true}).then( () => {
      //Cargamos los datos necesarios
      sequelize_fixtures.loadFile('test/fixtures/fixtures.json', models)
            .then(() => done())
    }, (err) => {
      console.log("Error connecting DB, retrying...");
      setTimeout(connectDB, 5000);
    })
  });
 it('Should return a 200 Ok message. Login ok, admin and remove Organization', function(done) {
  const email = encodeURIComponent("admin@redborder.com");
  const password = encodeURIComponent("adminadmin");
  const org = `email=${email}&password=${password}`;
   chai.request(server)
      .post('/auth/login') //Before test, log in
      .send(org)
      .end((err, res) => {
        chai.request(server)
          .delete('/api/organizations/12df8176-0813-49d1-8767-92f4d89f1c11')
          .set('Authorization', `bearer ${res.body.token}`)
          .send()
          .end((err, res) => {
            models.Organization.findAll({where: {}})
            .then(function(Orgs){
              try{
                res.should.have.status(200);
                res.body.should.have.property('success').eql(true);
                res.body.should.have.property('message').eql('Organization Organizacion con usuarios (org1@cor.com) delete correctly');
                Orgs.length.should.eql(3);
                done();
                } catch(e){
                done(e);
                }        
              }, function(err){
               done(err);
              })                
        });
      })
    });
  
  it('Should return a 200 Ok message. Login ok, admin and remove Organization WITH licenses and these licenses', function(done) {
  const email = encodeURIComponent("admin@redborder.com");
  const password = encodeURIComponent("adminadmin");
  const org = `email=${email}&password=${password}`;
  chai.request(server)
    .post('/auth/login') //Before test, log in
    .send(org)
    .end((err, res) => {
      chai.request(server)
        .delete('/api/organizations/12df8176-0813-49d1-8767-92f4d89f1c15')
        .set('Authorization', `bearer ${res.body.token}`)
        .send()
        .end((err, res) => {
          models.Organization.findAll({where: {}})
          .then(function(Orgs){
            models.License.findAll({where: {}})
              .then(function(licenses){
                try{
                  res.should.have.status(200);
                  res.body.should.have.property('success').eql(true);
                  res.body.should.have.property('message').eql('Organization Organizacion con licencias (org_licenses@cor.com) delete correctly');
                  Orgs.length.should.eql(3);
                  licenses.length.should.eql(1);
                  done();
                   } catch(e){
                    done(e);
                  }   
                }, function(err){
                done(err);
            });                
          }, function(err){
             done(err);
          })                
        });
    })
  });


  it('Should return a 401 not autorizated. Login ok but normal Organization', function(done) {
  const email = encodeURIComponent("normal@redborder.com");
  const password = encodeURIComponent("1234567890");
  const org = `email=${email}&password=${password}`;
   chai.request(server)
      .post('/auth/login') //Before test, log in
      .send(org)
      .end((err, res) => {
        chai.request(server)
          .delete('/api/organizations/12df8176-0813-49d1-8767-92f4d89f1c11')
          .set('Authorization', `bearer ${res.body.token}`)
          .send()
          .end((err, res) => {
            models.Organization.findAll({where: {}})
            .then(function(Orgs){
              try{
                res.should.have.status(401);
                res.body.should.have.property('success').eql(false);
                res.body.should.have.property('message').eql("You don't have permissions");
                Orgs.length.should.eql(4);
                done();
              } catch(e){
                done(e);
              }    
              }, function(err){
                  done(err);
              })       
        });
      })
    });
  
  it('Should return a 400 bad request. Organization not exists', function(done) {
  const email = encodeURIComponent("admin@redborder.com");
  const password = encodeURIComponent("adminadmin");
  const org = `email=${email}&password=${password}`;
   chai.request(server)
      .post('/auth/login') //Before test, log in
      .send(org)
      .end((err, res) => {
        chai.request(server)
          .delete('/api/organizations/12df8176-0813-49d1-8767-92f4d89f1c12') //This id not exists
          .set('Authorization', `bearer ${res.body.token}`)
          .send()
          .end((err, res) => {
            models.Organization.findAll({where: {}})
            .then(function(Orgs){
              try{
                res.should.have.status(400);
                res.body.should.have.property('success').eql(false);
                res.body.should.have.property('message').eql("Organization doesn't exists");
                Orgs.length.should.eql(4);
                done();
              } catch(e){
                done(e);
              }       
              }, function(err){
                done(err);
              })    
        });
      })
    });
});
