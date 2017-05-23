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

describe('Create organization Test', function() {

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
 it('Should return a 200 Ok message. Login ok, admin and new organization correct', function(done) {
  const email = encodeURIComponent("admin@redborder.com");
  const password = encodeURIComponent("adminadmin");
  const user = `email=${email}&password=${password}`;
   chai.request(server)
       .post('/auth/login') //Before test, log in
       .send(user)
       .end((err, res) => {
        const name  = encodeURIComponent("Org test");
        const cluster_id  = encodeURIComponent("cluster id");
        const email = encodeURIComponent("org@prueba.com");
        const sensors = encodeURIComponent("IPS;Flow;Social");
        const formData = `name=${name}&email=${email}&cluster_id=${cluster_id}&sensors=${sensors}`;
         chai.request(server)
           .post('/api/organizations')
           .set('Authorization', `bearer ${res.body.token}`)
           .send(formData)
           .end((err, res) => {
            models.Organization.findAll({where: {}})
            .then(function(organizations){
                try{
                  res.should.have.status(200);
                  res.body.should.have.property('success').eql(true);
                  res.body.should.have.property('message').eql('Organization Org test created correctly');
                  organizations.length.should.eql(5);
                  done()
                } catch (e) {
                   done(e);
                }
              }, function(err){
               done(err);
            })      
         })
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
        const name  = encodeURIComponent("Org test");
        const email = encodeURIComponent("org@prueba.com");
        const cluster_id = "Cluster id";
        const formData = `email=${email}&name=${name}&cluster_id=${cluster_id}`;
        chai.request(server)
           .post('/api/organizations')
           .set('Authorization', `bearer ${res.body.token}`)
           .send(formData)
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
