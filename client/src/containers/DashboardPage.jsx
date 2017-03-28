import React from 'react';
import Auth from '../modules/Auth';
import Dashboard from '../components/Dashboard.jsx';


class DashboardPage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);

    this.state = {
      secretData: 'You are autorizate'
    };
  }
  /**
   * Render the component.
   */
  render() {
    return (<Dashboard secretData={this.state.secretData}/>);
  }

}

export default DashboardPage;