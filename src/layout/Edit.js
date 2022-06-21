import React, { Component } from 'react';
import { Outlet } from 'react-router-dom';

export default class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
    };
  }
  
  render() {
return(
    <div>
      <Outlet />
    </div>
  );
}
}
