const path = require('path');
const Sequelize = require('sequelize')

const sequelize = new Sequelize(process.env.DATABASE_NAME, 
                                process.env.DATABASE_USER,
                                process.env.DATABASE_PASSWORD, 
        {
        dialect: "mysql", // or 'sqlite', 'postgres', 'mariadb'
        port:    3306, // or 5432 (for postgres)
        logging: false, //Not print logs
        });
//Import definitions of the models
//   -User from user.js
const User = sequelize.import(path.join(__dirname, 'user')); 
module.exports.User = User;


module.exports.MODE_DEVELOPMENT = "mode_development";
module.exports.MODE_TEST = "mode_test";


module.exports.connect = (mode, done) => {
  //Assign MODE_RUN enviroment to tell it to the rest of the files.
  sequelize
    .authenticate()
    .then(function(err) {
      //Ent variable contain if it's test mode or development mode
      if(process.env.MODE_RUN==="mode_test"){
        sequelize
        .sync({ force: true }) //Force re-create the database
        .then(function(err) {
          // Delete all users before start
          User.destroy({where: {}}).then(function(err, sequelize) {
            return done(null, sequelize);
          }).catch(function(error) {
            err.message = 'An error occurred while deleted the tables';
            return done(err);
          })
        }, function (err) { 
         err.message = 'An error occurred while creating the table';
         return done(err);
        });
      }
      else{
        sequelize
        .sync() //Force re-create the database
        .then(function(err) {
         return done(null, sequelize);
        }, function (err) { 
         err.message='An error occurred while creating the table';
         return done(err);
        });
      }
    }, function (err) { 
      err.message='Unable to connect to the database';
      return done(err);
    });
}