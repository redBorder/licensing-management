const Model = require('../server/models/models');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index.js');
const should = chai.should();
const sequelize_fixtures = require('sequelize-fixtures');
const passwordHash = require('password-hash');


chai.use(chaiHttp);

process.env.MODE_RUN = 'test';
process.env.NODE_ENV ='test';

describe('Profile Test', function() {

  //Before each test we clean databse and load fixtures file.
  beforeEach(function(done){
  	Model.connect(function(){
  		sequelize_fixtures.loadFile('test/fixtures/fixtures.json', Model)
  		.then(() => done())
  	});
  });
 it('Should return a 200 Ok message. Login ok and current password correct', function(done) {
  const email = encodeURIComponent("admin@redborder.com");
  const password = encodeURIComponent("adminadmin");
  const user = `email=${email}&password=${password}`;
   chai.request(server)
       .post('/auth/login') //Before test, log in
       .send(user)
       .end((err, res) => {
        const name  = encodeURIComponent("David test");
        const email_cambiado = encodeURIComponent("cambiado@prueba.com");
        const new_password = encodeURIComponent("");
        const confir_new_password = encodeURIComponent("");
        const data = `email=${email_cambiado}&password=${password}&name=${name}&new_password=${new_password}&confir_new_password=${confir_new_password}`;
         chai.request(server)
           .post('/api/changeProfile')
           .set('Authorization', `bearer ${res.body.token}`)
           .send(data)
           .end((err, res) => {
            try{
              res.should.have.status(200);
              res.body.should.have.property('success').eql(true);
              res.body.should.have.property('message').eql('You have changed your profile correctly!');
              done();
            } catch(e){
              done(e);
            }
         });
        })
    });

  it('Should return a 400 Bad Request. Login ok and current password incorrect', function(done) {
    const email = encodeURIComponent("admin@redborder.com");
    const password = encodeURIComponent("adminadmin");
    const user = `email=${email}&password=${password}`;
    chai.request(server)
       .post('/auth/login') //Before test, log in
       .send(user)
       .end((err, res) => {
        const name  = encodeURIComponent("David test");
        const email_cambiado = encodeURIComponent("cambiado@prueba.com");
        const new_password = encodeURIComponent("");
        const confir_new_password = encodeURIComponent("");
        const current_password = encodeURIComponent("INCORRECT");
        const data = `email=${email_cambiado}&password=${current_password}&name=${name}&new_password=${new_password}&confir_new_password=${confir_new_password}`;
         chai.request(server)
           .post('/api/changeProfile')
           .set('Authorization', `bearer ${res.body.token}`)
           .send(data)
           .end((err, res) => {
            try{
              res.should.have.status(400);
              res.body.should.have.property('success').eql(false);
              res.body.should.have.property('message').eql('Current password is not correct.');
              done();
            } catch(e){
              done(e);
            }
         });
        })
    });

  it('Should return a 400 Bad Request. Login ok and current password correct but new password too short', function(done) {
    const email = encodeURIComponent("admin@redborder.com");
    const password = encodeURIComponent("adminadmin");
    const user = `email=${email}&password=${password}`;
    chai.request(server)
       .post('/auth/login') //Before test, log in
       .send(user)
       .end((err, res) => {
        const name  = encodeURIComponent("David test");
        const email_cambiado = encodeURIComponent("cambiado@prueba.com");
        const new_password = encodeURIComponent("1234567");
        const confir_new_password = encodeURIComponent("1234567");
        const current_password = encodeURIComponent("adminadmin");
        const data = `email=${email_cambiado}&password=${current_password}&name=${name}&new_password=${new_password}&confir_new_password=${confir_new_password}`;
         chai.request(server)
           .post('/api/changeProfile')
           .set('Authorization', `bearer ${res.body.token}`)
           .send(data)
           .end((err, res) => {
            try{
              res.should.have.status(400);
              res.body.should.have.property('success').eql(false);
              res.body.should.have.property('message').eql('New password should be between 8 and 15 alphanumeric characters ');
              done();
            } catch(e){
              done(e);
            }
         });
        })
    });

  it('Should return a 400 Bad Request. Login ok and current password empty', function(done) {
    const email = encodeURIComponent("admin@redborder.com");
    const password = encodeURIComponent("adminadmin");
    const user = `email=${email}&password=${password}`;
    chai.request(server)
       .post('/auth/login') //Before test, log in
       .send(user)
       .end((err, res) => {
        const name  = encodeURIComponent("CAMBIADO");
        const email_cambiado = encodeURIComponent("cambiado@prueba.com");
        const new_password = encodeURIComponent("");
        const confir_new_password = encodeURIComponent("");
        const current_password = encodeURIComponent("");
        const data = `email=${email_cambiado}&password=${current_password}&name=${name}&new_password=${new_password}&confir_new_password=${confir_new_password}`;
         chai.request(server)
           .post('/api/changeProfile')
           .set('Authorization', `bearer ${res.body.token}`)
           .send(data)
           .end((err, res) => {
            try{
              res.should.have.status(400);
              res.body.should.have.property('success').eql(false);
              res.body.should.have.property('message').eql("Password couldn't be empty ");
              done();
            } catch(e){
              done(e);
            }
         });
        })
    });

 it('Should return a 401 Unauthorized. Login NOT ok and current password correct', function(done) {
    const email = encodeURIComponent("admin@redborder.com");
    const password = encodeURIComponent("INCORRECT");
    const user = `email=${email}&password=${password}`;
    chai.request(server)
       .post('/auth/login') //Before test, log in
       .send(user)
       .end((err, res) => {
        const name  = encodeURIComponent("CAMBIADO");
        const email_cambiado = encodeURIComponent("cambiado@prueba.com");
        const new_password = encodeURIComponent("");
        const confir_new_password = encodeURIComponent("");
        const current_password = encodeURIComponent("adminadmin");
        const data = `email=${email_cambiado}&password=${current_password}&name=${name}&new_password=${new_password}&confir_new_password=${confir_new_password}`;
         chai.request(server)
           .post('/api/changeProfile')
           .set('Authorization', `bearer ${res.body.token}`)
           .send(data)
           .end((err, res) => {
            try{
              res.should.have.status(401);
              done();
            } catch(e){
              done(e);
            }
         });
        })
    });

  it('Should change name, email and password. Login ok and password correct', function(done) {
  const email = encodeURIComponent("admin@redborder.com");
  const password = encodeURIComponent("adminadmin");
  const user = `email=${email}&password=${password}`;
   chai.request(server)
       .post('/auth/login') //Before test, log in
       .send(user)
       .end((err, res) => {
        const name  = encodeURIComponent("CAMBIADO");
        const email_cambiado = encodeURIComponent("cambiado@prueba.com");
        const new_password = encodeURIComponent("0987654321");
        const confir_new_password = encodeURIComponent("0987654321");
        const data = `email=${email_cambiado}&password=${password}&name=${name}&new_password=${new_password}&confir_new_password=${confir_new_password}`;
         chai.request(server)
           .post('/api/changeProfile')
           .set('Authorization', `bearer ${res.body.token}`)
           .send(data)
           .end((err, res) => {
            try{
              res.body.user.should.have.property('name').eql('CAMBIADO');
              res.body.user.should.have.property('email').eql('cambiado@prueba.com');
              passwordHash.verify( "0987654321",res.body.user.password).should.eql(true);
              done();
            } catch(e){
              done(e);
            }
         });
        })
    });

  it("Shouldn't change password. Login ok and news passwords different", function(done) {
  const email = encodeURIComponent("admin@redborder.com");
  const password = encodeURIComponent("adminadmin");
  const user = `email=${email}&password=${password}`;
   chai.request(server)
       .post('/auth/login') //Before test, log in
       .send(user)
       .end((err, res) => {
        const name  = encodeURIComponent("CAMBIADO");
        const email_cambiado = encodeURIComponent("cambiado@prueba.com");
        const new_password = encodeURIComponent("0987654321");
        const confir_new_password = encodeURIComponent("DIFERENT");
        const data = `email=${email_cambiado}&password=${password}&name=${name}&new_password=${new_password}&confir_new_password=${confir_new_password}`;
         chai.request(server)
           .post('/api/changeProfile')
           .set('Authorization', `bearer ${res.body.token}`)
           .send(data)
           .end((err, res) => {
            try{
              res.should.have.status(400);
              res.body.should.have.property('success').eql(false);
              res.body.should.have.property('message').eql('New passwords must be the same ');
              done();
            } catch(e){
              done(e);
            }
         });
        })
    });

  it("Shouldn't change password but should change email and name. Login ok and news passwords empties", function(done) {
  const email = encodeURIComponent("admin@redborder.com");
  const password = encodeURIComponent("adminadmin");
  const user = `email=${email}&password=${password}`;
   chai.request(server)
       .post('/auth/login') //Before test, log in
       .send(user)
       .end((err, res) => {
        const name  = encodeURIComponent("CAMBIADO");
        const email_cambiado = encodeURIComponent("cambiado@prueba.com");
        const new_password = encodeURIComponent("");
        const confir_new_password = encodeURIComponent("");
        const data = `email=${email_cambiado}&password=${password}&name=${name}&new_password=${new_password}&confir_new_password=${confir_new_password}`;
         chai.request(server)
           .post('/api/changeProfile')
           .set('Authorization', `bearer ${res.body.token}`)
           .send(data)
           .end((err, res) => {
            try{
              res.should.have.status(200);
              res.body.user.should.have.property('name').eql('CAMBIADO');
              res.body.user.should.have.property('email').eql('cambiado@prueba.com');
              passwordHash.verify("adminadmin", res.body.user.password).should.eql(true);
              done();
            } catch(e){
              done(e);
            }
         });
        })
    });
  
  it("Shouldn't change anything. Login ok and email, name and passwords empties", function(done) {
  const email = encodeURIComponent("admin@redborder.com");
  const password = encodeURIComponent("adminadmin");
  const user = `email=${email}&password=${password}`;
   chai.request(server)
       .post('/auth/login') //Before test, log in
       .send(user)
       .end((err, res) => {
        const name  = encodeURIComponent("");
        const email_cambiado = encodeURIComponent("");
        const new_password = encodeURIComponent("");
        const confir_new_password = encodeURIComponent("");
        const data = `email=${email_cambiado}&password=${""}&name=${name}&new_password=${new_password}&confir_new_password=${confir_new_password}`;
         chai.request(server)
           .post('/api/changeProfile')
           .set('Authorization', `bearer ${res.body.token}`)
           .send(data)
           .end((err, res) => {
            try{
              res.should.have.status(400);
              res.body.should.have.property('success').eql(false);
              res.body.should.have.property('message').eql("Please provide your name and please provide your email address and password couldn't be empty ")
              done();
            } catch(e){
              done(e);
            }
         });
        })
    });
});
