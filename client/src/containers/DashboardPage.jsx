import React from 'react';
import Auth from '../modules/Auth';
import Dashboard from '../components/Dashboard.jsx';
import toastr from 'toastr';


class DashboardPage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);
    toastr.options={
      "closeButton": true,
      "preventDuplicates": true,
      "newestOnTop": true
    }
    const name = localStorage.getItem('userProfileName');
    const email = localStorage.getItem('userProfileEmail');

    this.state = {
      secretData: name + ' (' + email + ') is autorizated to see this page'
   };

    {this.state.secretData && toastr.success(this.state.secretData) }
  }
  /**
   * Render the component.
   */
  render() {
    return (<Dashboard/>);
  }

}

export default DashboardPage;