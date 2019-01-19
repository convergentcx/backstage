import React, { Component } from 'react';
import './App.css';
import Web3 from 'web3';
import { connect } from 'react-redux'

import * as actionCreators from './store/actions';

let web3 = null;


class App extends Component {
  componentDidUpdate() {
    console.log('authorized: ', this.props.authorized);
  }

  handleAuthenticate = ({ publicAddress, signature }) => {
    this.props.onSignIn(publicAddress, signature);
    // fetch(`${process.env.REACT_APP_BACKEND_URL}/auth`, {
    //   body: JSON.stringify({ publicAddress, signature }),
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   method: 'POST'
    // }).then(response => response.json());
  }



  render() {
    return (
      <div className="App">
        <header className="App-header">
          <button onClick={this.props.onSign}> Sign MetaMask </button>
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
    onSign: (publicAddress, nonce) => dispatch(actionCreators.sign())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
