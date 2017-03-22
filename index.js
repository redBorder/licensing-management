const express = require('express');
const model = require('./server/models');
const config_DB = require('./config/config.json')
const app = express();


model.connect(config_DB.development.database, config_DB.development.user, 
	config_DB.development.password, module.MODE_TEST, function(err, sequalize){

		if(err){
			console.log(err);
		}
		else{
			// tell the app to look for static files in these directories
			app.use(express.static('./server/static/'));
			app.use(express.static('./client/dist/'));

			// start the server
			app.listen(3000, () => {
			  console.log('Server is running on http://localhost:3000 or http://127.0.0.1:3000');
			});
			sequalize.close();
		}
});

