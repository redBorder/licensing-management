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

describe('Edit user Test', function() {

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
 it('Should return a 200 Ok message. Login ok, admin and edit user correctly', function(done) {
  const email = encodeURIComponent("admin@redborder.com");
  const password = encodeURIComponent("adminadmin");
  const user = `email=${email}&password=${password}`;
   chai.request(server)
      .post('/auth/login') //Before test, log in
      .send(user)
      .end((err, res) => {
        const name  = "Cambiado";
        const email = "Cambiado@redborder.com";
        const role = "admin";
        const organization = "";
        const formData = `email=${email}&name=${name}&role=${role}&organization=${organization}`;
        chai.request(server)
          .put('/api/users/12df8176-0813-49d1-8767-92f4d89f1a81')
          .set('Authorization', `bearer ${res.body.token}`)
          .send(formData)
          .end((err, res) => {
           try{
            res.should.have.status(200);
            res.body.should.have.property('success').eql(true);
            res.body.should.have.property('message').eql('User Cambiado edited correctly');
            models.User.findOne({where: {
              id: "12df8176-0813-49d1-8767-92f4d89f1a81"
            }})
            .then(function(User){
              User.should.have.property('name').eql('Cambiado');
              User.should.have.property('email').eql('cambiado@redborder.com');
              User.should.have.property('role').eql('admin');
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
  
  it('Should return a 400 bad request. Login ok, admin but user not exists', function(done) {
  const email = encodeURIComponent("admin@redborder.com");
  const password = encodeURIComponent("adminadmin");
  const user = `email=${email}&password=${password}`;
   chai.request(server)
      .post('/auth/login') //Before test, log in
      .send(user)
      .end((err, res) => {
        const name  = "Cambiado";
        const email = "Cambiado@redborder.com";
        const role = "admin";
        const organization = "";
        const formData = `email=${email}&name=${name}&role=${role}&organization=${organization}`;
        chai.request(server)
          .put('/api/users/12df8176-0813-49d1-8767-92f4d89f1a88')
          .set('Authorization', `bearer ${res.body.token}`)
          .send(formData)
          .end((err, res) => {
           try{
            res.should.have.status(400);
            res.body.should.have.property('success').eql(false);
            res.body.should.have.property('message').eql("User doesn't exists");
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
  const user = `email=${email}&password=${password}`;
   chai.request(server)
      .post('/auth/login') //Before test, log in
      .send(user)
      .end((err, res) => {
        const name  = "Cambiado";
        const email = "Cambiado@redborder.com";
        const role = "admin";
        const organization = "";
        const formData = `email=${email}&name=${name}&role=${role}&organization=${organization}`;
        chai.request(server)
          .put('/api/users/12df8176-0813-49d1-8767-92f4d89f1a81')
          .set('Authorization', `bearer ${res.body.token}`)
          .send(formData)
          .end((err, res) => {
           try{
            res.should.have.status(401);
            res.body.should.have.property('success').eql(false);
            res.body.should.have.property('message').eql("You don't have permissions");
            models.User.findOne({where: {
              id: "12df8176-0813-49d1-8767-92f4d89f1a81"
            }})
            .then(function(User){
              User.should.have.property('name').eql('Usuario');
              User.should.have.property('email').eql('normal@redborder.com');
              User.should.have.property('role').eql('normal');
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
  const formData = `email=${email}&password=${password}`;
   chai.request(server)
      .post('/auth/login') //Before test, log in
      .send(formData)
      .end((err, res) => {
        const name  = "Cambiado";
        const email = "admin@redborder.com";
        const role = "admin";
        const organization = "";
        const formData = `email=${email}&name=${name}&role=${role}&organization=${organization}`;
        chai.request(server)
          .put('/api/users/12df8176-0813-49d1-8767-92f4d89f1a81')
          .set('Authorization', `bearer ${res.body.token}`)
          .send(formData)
          .end((err, res) => {
           try{
            res.should.have.status(400);
            res.body.should.have.property('success').eql(false);
            res.body.should.have.property('message').eql("Error editing user Cambiado. Email already exists.");
            models.User.findOne({where: {
              id: "12df8176-0813-49d1-8767-92f4d89f1a81"
            }})
            .then(function(User){
              User.should.have.property('name').eql('Usuario');
              User.should.have.property('email').eql('normal@redborder.com');
              User.should.have.property('role').eql('normal');
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
