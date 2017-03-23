const express = require('express');
const models = require('./server/models/models');
const app = express();
const {NewUser, FindUserByEmail, ChangeUserPassword} = require('./server/utils/user_controller');

models.connect(process.env.MODE_RUN, function(err, sequelize){
		console.log("Servidor iniciado en modo: " + process.env.MODE_RUN);
		if(err){
			console.log(err);
		}
		else{
			NewUser("david", "david@prueba.com", "0987654321", "normal", function(err, NewUser){
				if(err){
					console.log(err);
				}
				else{
					FindUserByEmail("DAvid@prueba.com", function(err, User){
						if(err){
							console.log(err)
						}
						else{
								console.log("User found correctly:")
								console.log(User.dataValues);
								setTimeout(function (){
									ChangeUserPassword(User, "0987654321", "0123456789", function(err, User_changed){
		  						if(!err){
									// tell the app to look for static files in these directories
									app.use(express.static('./server/static/'));
									app.use(express.static('./client/dist/'));

									// start the server
									app.listen(3000, () => {
									  console.log('Server is running on http://localhost:3000 or http://127.0.0.1:3000');
									});
								}
							})}, 10000);
						}
					});
				}
			});
		}
});

