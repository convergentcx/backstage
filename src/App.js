import React, { Component } from 'react';
import { connect } from 'react-redux'
import styled from 'styled-components';
import web3 from 'web3';

const AccessButton = styled.button`
  pointer: cursor;
  border: solid;
  border-size: 1px;
  border-color: #000;
  background: #2424D0;
  color: #FFF;
  transition: 0.3s;
  width: 300px;
  height: 200px;
  font-size: 32px;
  :hover {
    color: #FFF;
    background: #0044FF;
  }
`;

class AccessControlled extends Component {
  state = {
    isActivated: false,
  }

  render() {
    const { activated } = this.props;

    return (
      <div>
        {
          activated &&
          this.props.children
        }
      </div>
    );
  }
}

import * as actionCreators from './store/actions';

let web3 = null;


class App extends Component {
  state = {
    activated: false,
  }

  activate = () => {
    this.setState({
      activated: !this.state.activated,
    });
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
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <AccessButton onClick={this.props.onSign}>Access</AccessButton>
        <AccessControlled tokens={5}>
          <div style={{ color: '#000' }}>Hello World</div>
        </AccessControlled>
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
