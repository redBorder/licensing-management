import React from 'react';
import Auth from '../modules/Auth';
import Home from '../components/Home.jsx';


class HomePage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);

    const storedMessage = localStorage.getItem('successMessage');
    let successMessage = '';

    if (storedMessage) {
      successMessage = storedMessage;
      localStorage.removeItem('successMessage');
    }

    this.state = {
      successMessage: successMessage
    };
  }

  /**
   * Render the component.
   */
  render() {
    return (<Home successMessage={this.state.successMessage} />);
  }

}

export default HomePage;