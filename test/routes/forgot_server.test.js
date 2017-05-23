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

describe('Forgot Test', function() {

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

  it('Should return a 200 Ok message. Email correct', function(done) {
    const email = encodeURIComponent("admin@redborder.com");
    const data = `email=${email}`;

   chai.request(server)
     .post('/auth/forgot')
     .send(data)
     .end((err, res) => {
      try{
        res.should.have.status(200);
        res.body.should.have.property('success').eql(true);
        res.body.should.have.property('message').eql('An e-mail has been sent to admin@redborder.com with further instructions.');
        done();
      } catch(e){
          done(e);
        }
      });
  });

 it('Should return a 400 Bad Request. Email incorrect', function(done) {
    const email = encodeURIComponent("incorrect@redborder.com");
    const data = `email=${email}`;

   chai.request(server)
     .post('/auth/forgot')
     .send(data)
     .end((err, res) => {
      try{
        res.should.have.status(400);
        res.body.should.have.property('success').eql(false);
        res.body.should.have.property('message').eql('No user registered with this email!');
        done();
      } catch(e){
          done(e);
        }
      });
  });
});
