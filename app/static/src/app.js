import React from 'react';
import './App.css';
import { withRouter } from "react-router-dom";
import * as actions from './actions';
import { connect } from "react-redux";

class App extends React.Component {

render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
}
}

export default withRouter(connect(
  null,
  actions
)(App));