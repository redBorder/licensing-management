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

describe('Login Test', function() {

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

 it('Should return a 200 Ok message. Email and password correct', function(done) {
    const email = encodeURIComponent("admin@redborder.com");
    const password = encodeURIComponent("adminadmin");
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
 it('Should return a 400 Bad Request. Password incorrect', function(done) {
    const email = encodeURIComponent("admin@redborder.com");
    const password = encodeURIComponent("INCORRECTPASSWORD");
    const user = `email=${email}&password=${password}`;

     chai.request(server)
         .post('/auth/login')
         .send(user)
         .end((err, res) => {
          try{
            res.should.have.status(400);
            res.body.should.have.property('success').eql(false);
            res.body.should.have.property('message').eql('Incorrect email or password');
            done();
            } catch(e){
            done(e);
          }
         });
  });
 it('Should return a 400 Bad Request. Email incorrect', function(done) {
    const email = encodeURIComponent("incorrect@redborder.com");
    const password = encodeURIComponent("adminadmin");
    const user = `email=${email}&password=${password}`;

     chai.request(server)
         .post('/auth/login')
         .send(user)
         .end((err, res) => {
          try{
            res.should.have.status(400);
            res.body.should.have.property('success').eql(false);
            res.body.should.have.property('message').eql('Incorrect email or password');
            done();
            } catch(e){
            done(e);
          }
         });
  });
});
