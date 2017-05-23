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

describe('List users Test', function() {

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
 it('Should return a 200 Ok message. Login ok, admin and list users', function(done) {
  const email = encodeURIComponent("admin@redborder.com");
  const password = encodeURIComponent("adminadmin");
  const user = `email=${email}&password=${password}`;
   chai.request(server)
      .post('/auth/login') //Before test, log in
      .send(user)
      .end((err, res) => {
        chai.request(server)
          .get('/api/users?page=1')
          .set('Authorization', `bearer ${res.body.token}`)
          .send()
          .end((err, res) => {            
            models.User.findAll({where: {}})
            .then(function(Users){
              try{
                res.should.have.status(200);
                res.body.should.have.property('success').eql(true);
                res.body.users.length.should.eql(Users.length);
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

  it('Should return a 401 not autorizated. Login ok but normal user', function(done) {
  const email = encodeURIComponent("normal@redborder.com");
  const password = encodeURIComponent("1234567890");
  const user = `email=${email}&password=${password}`;
   chai.request(server)
      .post('/auth/login') //Before test, log in
      .send(user)
      .end((err, res) => {
        chai.request(server)
          .get('/api/users?page=1')
          .set('Authorization', `bearer ${res.body.token}`)
          .send()
          .end((err, res) => { 
           try{
            res.should.have.status(401);
            res.body.should.have.property('success').eql(false);
            res.body.should.have.property('message').eql("You don't have permissions");
            done();
            } catch(e){
              done(e);
          }           
        });
      })
    });

});
