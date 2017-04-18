import React from 'react';
import Auth from '../modules/Auth';
import Home from '../components/Home.jsx';


class HomePage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);

  }
  
  /**
   * Render the component.
   */
  render() {
    return (<Home/>);
  }

}

export default HomePage;