const Sequelize = require('sequelize')

module.exports.MODE_PRODUCTION = "mode_development";
module.exports.MODE_TEST = "mode_test";

module.exports.connect = (database, user, password, mode, done) => {
  const sequelize = new Sequelize(database, user, password, {
        dialect: "mysql", // or 'sqlite', 'postgres', 'mariadb'
        port:    3306, // or 5432 (for postgres)
        });
  
  sequelize
    .authenticate()
    .then(function(err) {
      console.log('Connection has been established to the database successfully.');
      if(mode===module.MODE_TEST){
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

/*const User = sequelize.define('User', {
  username: Sequelize.STRING,
  password: Sequelize.STRING
});

const NewUser = User.build({
  username: 'admin',
  password: 'admin' //Tenemos que hacer una funcion que haga un Hash
})

NewUser.save().then(function(NewUser) {
	console.log("User saved correctly");
  	console.log(user);
})*/
