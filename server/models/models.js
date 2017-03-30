const path = require('path');
const Sequelize = require('sequelize')
const config = require('../../config/config.json')
const DB_config = config[process.env.MODE_RUN]

const sequelize = new Sequelize(DB_config.database, 
                                DB_config.user,
                                DB_config.password, 
        {
        dialect: "mysql", // or 'sqlite', 'postgres', 'mariadb'
        port:    3306, // or 5432 (for postgres)
        logging: DB_config.logging=="true" //Print logs
        });
//Import definitions of the models
//   -User from user.js
const User = sequelize.import(path.join(__dirname, 'user')); 
module.exports.User = User;


module.exports.connect = (done) => {
  //Assign MODE_RUN enviroment to tell it to the rest of the files.
  sequelize
    .authenticate()
    .then(function(err) {
      //Ent variable contain if it's test mode or development mode
      if(process.env.MODE_RUN==="test"){
        sequelize
        .sync({force:true}) //Force re-create the database
        .then(function(err) {
            return done(null, sequelize);
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

module.exports.Module = sequelize;