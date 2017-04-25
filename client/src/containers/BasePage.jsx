import React, { Component } from 'react';
import Base from '../components/Base.jsx'
/*
Clase BasePage encargada de crear un componente Base con un compenten 'children' recibido mediante reac-router
*/
class BasePage extends Component {
  constructor() {
    super();
  }
  render(){
    return <Base children={this.props.children}/>
  }
}

export default BasePage;
