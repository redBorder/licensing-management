const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server/index.js');
const should = chai.should();
const sequelize_fixtures = require('sequelize-fixtures');
//Incializamos sequelize
const sequelize = require('../../server/db').sequelize;

//Cargamos los modelos
const models = require('../../server/models')(sequelize);


chai.use(chaiHttp);

process.env.MODE_RUN = 'test';
process.env.NODE_ENV ='test';

describe('Edit organization Test', function() {

  //Before each test we clean databse and load fixtures file.
  beforeEach(function(done){
    //Sincronizamos la base de datos
    sequelize.sync({force:true}).then(function(){
      //Cargamos los datos necesarios
      sequelize_fixtures.loadFile('test/fixtures/fixtures.json', models)
            .then(() => done())
    })
  });
 it('Should return a 200 Ok message. Login ok, admin and edit organization correctly', function(done) {
  const email = encodeURIComponent("admin@redborder.com");
  const password = encodeURIComponent("adminadmin");
  const formData = `email=${email}&password=${password}`;
   chai.request(server)
      .post('/auth/login') //Before test, log in
      .send(formData)
      .end((err, res) => {
        const name  = "Cambiado";
        const email = "Cambiado@redborder.com";
        const cluster_id = "Cluster id";
        const sensors = "IPS;Flow;Social";
        const formData = `email=${email}&name=${name}&cluster_id=${cluster_id}&sensors=${sensors}`;
        chai.request(server)
          .put('/api/organizations/12df8176-0813-49d1-8767-92f4d89f1c11')
          .set('Authorization', `bearer ${res.body.token}`)
          .send(formData)
          .end((err, res) => {
           try{
            res.should.have.status(200);
            res.body.should.have.property('success').eql(true);
            res.body.should.have.property('message').eql('Organization Cambiado edited correctly');
            models.Organization.findOne({where: {
              id: "12df8176-0813-49d1-8767-92f4d89f1c11"
            }})
            .then(function(org){
              org.should.have.property('name').eql('Cambiado');
              org.should.have.property('email').eql('cambiado@redborder.com');
              }, function(err){
               done(err);
              })
            done();
             } catch(e){
              done(e);
            }           
        });
      })
    });
  
  it('Should return a 400 bad request. Login ok, admin but organization not exists', function(done) {
  const email = encodeURIComponent("admin@redborder.com");
  const password = encodeURIComponent("adminadmin");
  const formData = `email=${email}&password=${password}`;
   chai.request(server)
      .post('/auth/login') //Before test, log in
      .send(formData)
      .end((err, res) => {
        const name  = "Cambiado";
        const email = "Cambiado@redborder.com";
        const cluster_id = "Cluster id";
        const sensors = "IPS;Flow;Social";
        const formData = `email=${email}&name=${name}&cluster_id=${cluster_id}&sensors=${sensors}`;
        chai.request(server)
          .put('/api/organizations/12df8176-0813-49d1-8767-92f4d89f1a18')
          .set('Authorization', `bearer ${res.body.token}`)
          .send(formData)
          .end((err, res) => {
           try{
            res.should.have.status(400);
            res.body.should.have.property('success').eql(false);
            res.body.should.have.property('message').eql("Organization doesn't exists");
            done();
             } catch(e){
              done(e);
            }           
        });
      })
    });

  it('Should return a 401 not autorizated. Login ok but normal user', function(done) {
  const email = encodeURIComponent("normal@redborder.com");
  const password = encodeURIComponent("1234567890");
  const organization = `email=${email}&password=${password}`;
   chai.request(server)
      .post('/auth/login') //Before test, log in
      .send(organization)
      .end((err, res) => {
        const name  = "Cambiado";
        const email = "Cambiado@redborder.com";
        const cluster_id = "Cluster id";
        const sensors = "IPS;Flow;Social";
        const formData = `email=${email}&name=${name}&cluster_id=${cluster_id}&sensors=${sensors}`;
        chai.request(server)
          .put('/api/organizations/12df8176-0813-49d1-8767-92f4d89f1c11')
          .set('Authorization', `bearer ${res.body.token}`)
          .send(formData)
          .end((err, res) => {
           try{
            res.should.have.status(401);
            res.body.should.have.property('success').eql(false);
            res.body.should.have.property('message').eql("You don't have permissions");
            models.Organization.findOne({where: {
              id: "12df8176-0813-49d1-8767-92f4d89f1c11"
            }})
            .then(function(org){
              org.should.have.property('name').eql('Organizacion con usuarios');
              org.should.have.property('email').eql('org1@cor.com');
              }, function(err){
               done(err);
              })
            done();
             } catch(e){
              done(e);
            }           
        });
      })
    });

  it('Should return a 400 bad request. Login ok, admin user but email duplicated', function(done) {
  const email = encodeURIComponent("admin@redborder.com");
  const password = encodeURIComponent("adminadmin");
  const user = `email=${email}&password=${password}`;
   chai.request(server)
      .post('/auth/login') //Before test, log in
      .send(user)
      .end((err, res) => {
        const name  = "Cambiado";
        const email = "org2@cor.com";
        const cluster_id = "Cluster id";
        const sensors = "IPS;Flow;Social";
        const formData = `email=${email}&name=${name}&cluster_id=${cluster_id}&sensors=${sensors}`;
        chai.request(server)
          .put('/api/organizations/12df8176-0813-49d1-8767-92f4d89f1c11')
          .set('Authorization', `bearer ${res.body.token}`)
          .send(formData)
          .end((err, res) => {
           try{
            res.should.have.status(400);
            res.body.should.have.property('success').eql(false);
            res.body.should.have.property('message').eql("Error editing organization Cambiado. Email already exists.");
            models.Organization.findOne({where: {
              id: "12df8176-0813-49d1-8767-92f4d89f1c11"
            }})
            .then(function(org){
              org.should.have.property('name').eql('Organizacion con usuarios');
              org.should.have.property('email').eql('org1@cor.com');
              }, function(err){
               done(err);
              })
            done();
             } catch(e){
              done(e);
            }           
        });
      })
    });
});
