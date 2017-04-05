import React from 'react';
import { hashHistory, Router } from 'react-router';
import routes from './routes.js';



class App extends React.Component{
	render(){
		return(
		    <Router history={hashHistory} routes={routes} />
		);
		
	}
}


export default App;