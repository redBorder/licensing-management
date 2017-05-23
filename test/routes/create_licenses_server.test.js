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

describe('Create license Test', function() {

  //Before each test we clean databse and load fixtures file.
  beforeEach(function(done){
       //Sincronizamos la base de datos
    sequelize.sync({force:true}).then( () => {
      //Cargamos los datos necesarios
      sequelize_fixtures.loadFile('test/fixtures/fixtures.json', models)
            .then(() => done())
    }, (err) => {
      console.log("Error connecting DB, retrying...");
      setTimeout(connectDB, 1000);
    })
  });
 it('Should return a 200 Ok message. Login ok, admin and new license correct', function(done) {
  const email = encodeURIComponent("admin@redborder.com");
  const password = encodeURIComponent("adminadmin");
  const user = `email=${email}&password=${password}`;
   chai.request(server)
       .post('/auth/login') //Before test, log in
       .send(user)
       .end((err, res) => {
        const sensors_object = {
          Flow:100,
          Social:200,
          IPS:300
        }
        const duration = encodeURIComponent(6);
        const limit_bytes = encodeURIComponent(2000);
        const OrganizationId = encodeURIComponent("12df8176-0813-49d1-8767-92f4d89f1c11");
        const UserId = encodeURIComponent("12df8176-0813-49d1-8767-92f4d89f1a01");
        const sensors = JSON.stringify(sensors_object);
        const formData = `sensors=${sensors}&duration=${duration}&UserId=${UserId}&limit_bytes=${limit_bytes}&OrganizationId=${OrganizationId}`;
         chai.request(server)
           .post('/api/licenses')
           .set('Authorization', `bearer ${res.body.token}`)
           .send(formData)
           .end((err, res) => {
            models.License.findAll({where: {}})
            .then(function(licenses){
                try{
                  res.should.have.status(200);
                  res.body.should.have.property('success').eql(true);
                  res.body.should.have.property('message').eql('License created correctly');
                  licenses.length.should.eql(5);
                  done();
                } catch (e) {
                   done(e);
                }
              }, function(err){
               done(err);
            })      
         })
      })
  });

  it('Should return a 200 ok. Login ok, normal user and licenses to his organization', function(done) {
    const email = encodeURIComponent("normal@redborder.com");
    const password = encodeURIComponent("1234567890");
    const user = `email=${email}&password=${password}`;
    chai.request(server)
       .post('/auth/login') //Before test, log in
       .send(user)
       .end((err, res) => {
         const sensors_object = {
          Flow:100,
          Social:200,
          IPS:300
        }
        const duration = encodeURIComponent(12);
        const limit_bytes = encodeURIComponent(2000);
        const OrganizationId = encodeURIComponent("12df8176-0813-49d1-8767-92f4d89f1c11");
        const UserId = encodeURIComponent("12df8176-0813-49d1-8767-92f4d89f1a81");
        const sensors = JSON.stringify(sensors_object);
        const formData = `sensors=${sensors}&duration=${duration}&UserId=${UserId}&limit_bytes=${limit_bytes}&OrganizationId=${OrganizationId}`;
         chai.request(server)
           .post('/api/licenses')
           .set('Authorization', `bearer ${res.body.token}`)
           .send(formData)
           .end((err, res) => {
            models.License.findAll({where: {}})
            .then(function(licenses){
                try{
                  res.should.have.status(200);
                  res.body.should.have.property('success').eql(true);
                  res.body.should.have.property('message').eql('License created correctly');
                  licenses.length.should.eql(5);
                  done();
                } catch (e) {
                   done(e);
                }
              }, function(err){
               done(err);
            })      
         })
      })
  });
  
    it('Should return a 401 not autorizated. Login ok, normal user but licenses to another organization', function(done) {
    const email = encodeURIComponent("normal@redborder.com");
    const password = encodeURIComponent("1234567890");
    const user = `email=${email}&password=${password}`;
    chai.request(server)
       .post('/auth/login') //Before test, log in
       .send(user)
       .end((err, res) => {
         const sensors_object = {
          Flow:100,
          Social:200,
          IPS:300
        }
        const duration = encodeURIComponent(12);
        const limit_bytes = encodeURIComponent(2000);
        const OrganizationId = encodeURIComponent("12df8176-0813-49d1-8767-92f4d89f1c15");
        const UserId = encodeURIComponent("12df8176-0813-49d1-8767-92f4d89f1a81");
        const sensors = JSON.stringify(sensors_object);
        const formData = `sensors=${sensors}&duration=${duration}&UserId=${UserId}&limit_bytes=${limit_bytes}&OrganizationId=${OrganizationId}`;
         chai.request(server)
           .post('/api/licenses')
           .set('Authorization', `bearer ${res.body.token}`)
           .send(formData)
           .end((err, res) => {
            models.License.findAll({where: {}})
            .then(function(licenses){
                try{
                  res.should.have.status(401);
                  res.body.should.have.property('success').eql(false);
                  res.body.should.have.property('message').eql("You don't have permissions");
                  licenses.length.should.eql(4);
                  done();
                } catch (e) {
                   done(e);
                }
              }, function(err){
               done(err);
            })      
         })
      })
  });

    it('Should return a 400 bad request. Wrong limit_bytes', function(done) {
    const email = encodeURIComponent("normal@redborder.com");
    const password = encodeURIComponent("1234567890");
    const user = `email=${email}&password=${password}`;
    chai.request(server)
       .post('/auth/login') //Before test, log in
       .send(user)
       .end((err, res) => {
        const sensors_object = {
          Flow:100,
          Social:200,
          IPS:300
        }
        const duration = encodeURIComponent(2);
        const limit_bytes = encodeURIComponent("erroneo");
        const OrganizationId = encodeURIComponent("12df8176-0813-49d1-8767-92f4d89f1c11");
        const UserId = encodeURIComponent("12df8176-0813-49d1-8767-92f4d89f1a81");
        const sensors = JSON.stringify(sensors_object);
        const formData = `sensors=${sensors}&duration=${duration}&UserId=${UserId}&limit_bytes=${limit_bytes}&OrganizationId=${OrganizationId}`;
         chai.request(server)
           .post('/api/licenses')
           .set('Authorization', `bearer ${res.body.token}`)
           .send(formData)
           .end((err, res) => {
            models.License.findAll({where: {}})
            .then(function(licenses){
                try{
                  res.should.have.status(400);
                  res.body.should.have.property('success').eql(false);
                  res.body.should.have.property('message').eql('Error creating license.<br></br> The sensors and limit bytes must be numbers');
                  licenses.length.should.eql(4);
                  done();
                } catch (e) {
                   done(e);
                }
              }, function(err){
               done(err);
            })      
         })
      })
  });
  
  it('Should return a 400 bad request. Empty sensors', function(done) {
    const email = encodeURIComponent("normal@redborder.com");
    const password = encodeURIComponent("1234567890");
    const user = `email=${email}&password=${password}`;
    chai.request(server)
       .post('/auth/login') //Before test, log in
       .send(user)
       .end((err, res) => {
        const duration = encodeURIComponent(2);
        const limit_bytes = encodeURIComponent("erroneo");
        const OrganizationId = encodeURIComponent("12df8176-0813-49d1-8767-92f4d89f1c11");
        const UserId = encodeURIComponent("12df8176-0813-49d1-8767-92f4d89f1a81");
        const formData = `duration=${duration}&UserId=${UserId}&limit_bytes=${limit_bytes}&OrganizationId=${OrganizationId}`;
         chai.request(server)
           .post('/api/licenses')
           .set('Authorization', `bearer ${res.body.token}`)
           .send(formData)
           .end((err, res) => {
            models.License.findAll({where: {}})
            .then(function(licenses){
                try{
                  res.should.have.status(400);
                  res.body.should.have.property('success').eql(false);
                  res.body.should.have.property('message').eql('Please provide sensors ');
                  licenses.length.should.eql(4);
                  done();
                } catch (e) {
                   done(e);
                }
              }, function(err){
               done(err);
            })      
         })
      })
  });
});
