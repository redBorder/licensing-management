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

describe('Reset Password Test', function() {

  //Before each test we clean databse and load fixtures file.
  beforeEach(function(done){
    //Sincronizamos la base de datos
    sequelize.sync({force:true}).then(function(){
      //Cargamos los datos necesarios
      sequelize_fixtures.loadFile('test/fixtures/fixtures.json', models)
            .then(() => done())
    })
  });

  it('Should log in with new password', function(done) {   
   const confir_password = encodeURIComponent("adminnueva");
   const password = encodeURIComponent("adminnueva");
   const data = `password=${password}&confir_password=${confir_password}`; 
   chai.request(server)
     .post('/auth/reset/testtoken')
     .send(data)
     .end((err, res) => {
      try{
        res.should.have.status(200);
        res.body.should.have.property('success').eql(true);
        res.body.should.have.property('message').eql('An e-mail has been sent to admin@redborder.com with confirmation. The password has been changed');
        } catch(e){
          done(e);
        }
        const email = encodeURIComponent("admin@redborder.com");
        const user = `email=${email}&password=${password}`;
        chai.request(server)
        .post('/auth/login')
        .send(user)
        .end((err, res) => {
         try{
           res.should.have.status(200);
           res.body.should.have.property('success').eql(true);
           res.body.should.have.property('message').eql('You have successfully logged in!');
           done();
           } catch(e){
           done(e);
          }
        });
      });
    });

  it('Should return a 200 Ok message. Correct Passwords', function(done) {   
   const confir_password = encodeURIComponent("adminNUEVA");
   const password = encodeURIComponent("adminNUEVA");
   const data = `password=${password}&confir_password=${confir_password}`; 
   chai.request(server)
       .post('/auth/reset/testtoken')
       .send(data)
       .end((err, res) => {
        try{
          res.should.have.status(200);
          res.body.should.have.property('success').eql(true);
          res.body.should.have.property('message').eql('An e-mail has been sent to admin@redborder.com with confirmation. The password has been changed');
          done();
        } catch(e){
          done(e);
        }
       });
    });

  it('Should return a 400 Bad Request. Passwords different', function(done) {   
   const confir_password = encodeURIComponent("adminDISTINTA");
   const password = encodeURIComponent("adminNUEVA");
   const data = `password=${password}&confir_password=${confir_password}`; 
   chai.request(server)
       .post('/auth/reset/testtoken')
       .send(data)
       .end((err, res) => {
        try{
          res.should.have.status(400);
          res.body.should.have.property('success').eql(false);
          res.body.should.have.property('message').eql('Password must be equal');
          done();
        } catch(e){
          done(e);
        }
       });
    });

  it('Should return a 400 Bad Request. Passwords too short', function(done) {  
   const confir_password = encodeURIComponent("admin");
   const password = encodeURIComponent("admin");
   const data = `password=${password}&confir_password=${confir_password}`; 
   chai.request(server)
       .post('/auth/reset/testtoken')
       .send(data)
       .end((err, res) => {
        try{
          res.should.have.status(400);
          res.body.should.have.property('success').eql(false);
          res.body.should.have.property('message').eql('Password should be between 8 and 15 alphanumeric characters.');
          done();
        } catch(e){
          done(e);
        }
       });
    });

  it('Should return a 400 Bad Request. Passwords too long', function(done) {  
   const confir_password = encodeURIComponent("1234567890123456");
   const password = encodeURIComponent("1234567890123456");
   const data = `password=${password}&confir_password=${confir_password}`; 
   chai.request(server)
       .post('/auth/reset/testtoken')
       .send(data)
       .end((err, res) => {
        try{
          res.should.have.status(400);
          res.body.should.have.property('success').eql(false);
          res.body.should.have.property('message').eql('Password should be between 8 and 15 alphanumeric characters.');
          done();
        } catch(e){
          done(e);
        }
       });
    });

  it('Should return a 400 Bad Request. Empty passwords', function(done) {   
   const confir_password = encodeURIComponent("");
   const password = encodeURIComponent("");
   const data = `password=${password}&confir_password=${confir_password}`; 
   chai.request(server)
       .post('/auth/reset/testtoken')
       .send(data)
       .end((err, res) => {
        try{
          res.should.have.status(400);
          res.body.should.have.property('success').eql(false);
          res.body.should.have.property('message').eql('Password should be between 8 and 15 alphanumeric characters.');
          done();
        } catch(e){
          done(e);
        }
       });
    });
});