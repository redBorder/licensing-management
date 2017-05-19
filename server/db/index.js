const Sequelize = require('sequelize')
const config = require('../../config/config.json')
const MODE_RUN = process.env.MODE_RUN || "development"
const DB_config = config[MODE_RUN]

const sequelize = new Sequelize(process.env.DB_NAME || DB_config.database, 
                                process.env.DB_USER || DB_config.user,
                                process.env.DB_PASSWORD || DB_config.password, 
        //Options
        {
        dialect: process.env.DB_SERVER || DB_config.BD,
        host: process.env.DB_HOST || DB_config.host,
        port:   process.env.DB_PORT || DB_config.port, 
        logging: (process.env.DB_LOG=="true" || DB_config.log =="true") ? console.log : false
});

//Cargamos los diferentes modelos
const models = require('../models')(sequelize);

const connectDB = () => {
	if(process.env.MODE_RUN == "test"){
		sequelize.sync({force:true}).then( () => {
			console.log("Connected to DB");
		}, (err) => {
			console.log("Error connecting DB, retrying...");
			setTimeout(connectDB, 5000);
		})
	}
	else{
		sequelize.sync().then(() => {
			console.log("Connected to DB");
			//If there aren't users, create one admin user by default in production mode...
			models.User.findAll({where: {
				role: "admin"
			}})
			.then((users) => {
				if(users.length == 0){
					const NewUser = models.User.build({
					  name: "Admin",
					  email: "admin@redborder.com", 
					  password: "adminadmin",
					  role: "admin"
					})
			  	NewUser.save().then(() => {
			  		console.log("New default admin user created.");
			  		console.log("	Email: admin@redborder.com");
			  		console.log("	Password: adminadmin");
			  		console.log("Please, change this user profile");
			  	});
			  }
			})
		}, (err) => {
			//Sequelize error
			console.log("Error connecting DB, retrying...")
			setTimeout(connectDB, 5000);
		});
	}
}

module.exports.sequelize=sequelize;
module.exports.connectDB=connectDB;
