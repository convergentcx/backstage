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

class App extends Component {
  state = {
    activated: false,
  }

  activate = () => {
    this.setState({
      activated: !this.state.activated,
    });
  }

  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <AccessButton onClick={this.activate}>Access</AccessButton>
        <AccessControlled tokens={5} activated={this.state.activated}>
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
    onSignIn: (signature) => dispatch({type: 'SIGN', signature: signature})
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
