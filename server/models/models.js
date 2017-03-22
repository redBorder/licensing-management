const path = require('path');
const Sequelize = require('sequelize')

const sequelize = new Sequelize(process.env.DATABASE_NAME, 
                                process.env.DATABASE_USER,
                                process.env.DATABASE_PASSWORD, 
        {
        dialect: "mysql", // or 'sqlite', 'postgres', 'mariadb'
        port:    3306, // or 5432 (for postgres)
        });
//Import definitions of the models
//   -User from user.js
const User = sequelize.import(path.join(__dirname, 'user')); 
module.exports.User = User;


module.exports.MODE_PRODUCTION = "mode_development";
module.exports.MODE_TEST = "mode_test";


module.exports.connect = (mode, done) => {
  //Assign MODE_RUN enviroment to tell it to the rest of the files.
  process.env.MODE_RUN=mode;
  sequelize
    .authenticate()
    .then(function(err) {
      console.log('Connection has been established to the database successfully.');
      //Ent variable contain if it's test mode or development mode
      if(process.env.MODE_RUN===module.MODE_TEST){
        sequelize
        .sync({ force: true }) //Force re-create the database
        .then(function(err) {
         console.log('Database created successfully in mode test');
         return done(null, sequelize);
        }, function (err) { 
         console.log('An error occurred while creating the table:', err);
         return done(err);
        });
      }
      else{
        sequelize
        .sync() //Force re-create the database
        .then(function(err) {
         console.log('Database created successfully in mode production'); 
         return done(null, sequelize);
        }, function (err) { 
         console.log('An error occurred while creating the table:', err);
         return done(err);
        });
      }
    }, function (err) { 
      console.log('Unable to connect to the database:', err);
      return done(err);
    });
}