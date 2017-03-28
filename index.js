const express = require('express');
const models = require('./server/models/models');
const app = express();

models.connect(process.env.MODE_RUN, function(err, sequelize){
	console.log("Servidor iniciado en modo: " + process.env.MODE_RUN);
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
	}
});	