import React, { Component } from 'react';
import Base from '../components/Base.jsx'

class BasePage extends Component {
  constructor() {
    super();
  }
  render(){
    return <Base children={this.props.children}/>
  }
}

export default BasePage;
