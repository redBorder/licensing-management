import React from 'react';
import Auth from '../modules/Auth';
import Dashboard from '../components/Dashboard.jsx';


class DashboardPage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);

    const name = localStorage.getItem('userProfileName');
    const email = localStorage.getItem('userProfileEmail')

    this.state = {
      secretData: name + ' (' + email + ') is autorizated to see this page'
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