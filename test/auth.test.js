const Model = require('../server/models/models');
const assert = require('assert');
const request = require('request');
const sequelize_fixtures = require('sequelize-fixtures');


describe('Authentication User', function() {
  before(function(done){
  	Model.connect(process.env.MODE_RUN, function(){
  		sequelize_fixtures.loadFile('test/fixtures/fixtures.json', Model)
  		.then(() => done())
  	});
  });

    it('Should return a 200 Ok message', function(done) {
      const email = encodeURIComponent('admin@redborder.com');
      const password = encodeURIComponent('adminadmin');
      const formData = `email=${email}&password=${password}`;
      request.post({
          headers: {'content-type' : 'application/x-www-form-urlencoded'},
          url: 'http://localhost:3000/auth/login',
           body: formData
           }, function(error, response, body){
            if(error)
              return done(error)
              try{
                assert.equal(response.statusCode, 200);
                return done()
            }
              catch (e){
                return done(e);
            }
      });
      
    });


    it('Should return a 400 error message', function(done) {
    	const email = encodeURIComponent('admin@redborde.com');
      const password = encodeURIComponent('incorrectpasword');
      const formData = `email=${email}&password=${password}`;
       request.post({
          headers: {'content-type' : 'application/x-www-form-urlencoded'},
          url: 'http://localhost:3000/auth/login',
          body: formData
           }, function(error, response, body){
            if(error)
              return done(error)
              try{
                assert.equal(response.statusCode, 400);
                return done()
            }
              catch (e){
                return done(e);
            }
      });  
    });
});
