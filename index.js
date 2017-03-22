const express = require('express');
const models = require('./server/models/models');
const app = express();
const {NewUser, FindUserByEmail} = require('./server/utils/user_controller');

models.connect(models.MODE_TEST, function(err, sequelize){
		if(err){
			console.log(err);
		}
		else{
			NewUser("david", "david@prueba.com", "0987654321", "normal", function(err, NewUser){
				if(err){
					console.log(err);
				}
				else{
					FindUserByEmail("davisd@prueba.com", function(err, Users){
						if(err){
							console.log(err)
						}
						else{
							
								console.log("User found correctly")
								console.log(Users);
								// tell the app to look for static files in these directories
								app.use(express.static('./server/static/'));
								app.use(express.static('./client/dist/'));

								// start the server
								app.listen(3000, () => {
								  console.log('Server is running on http://localhost:3000 or http://127.0.0.1:3000');
								});
						}
					});
				}
			});
		}
});

