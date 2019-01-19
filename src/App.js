import React, { Component } from 'react';
import './App.css';
import web3 from 'web3';

import { connect } from 'react-redux'

class App extends Component {
  componentDidUpdate() {
    console.log('authorized: ', this.props.authorized);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
        <button onClick={this.props.onSignIn}>Sign in</button>
        </header>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authorized: state.auth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSignIn: (signature) => dispatch({type: 'SIGN', signature: signature})
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
