import React, { Component } from 'react';
import { connect } from 'react-redux'
import styled from 'styled-components';
import Web3 from 'web3';

import {
  Church,
  Flowers,
  Man,
  Sunflower,
} from './img';

const stdWeb3 = () => {
  const w3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io'));
  return w3;
}

const sign = async data => {
  const sig = await Web3.eth.sign(data, Web3.eth.defaultAccount);
  return sig;
}

const recoverAddress = (data, sig, givenAddr) => {
  const w3 = stdWeb3();
  return w3.eth.accounts.recover(data, sig);
}

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
  font-size: 1.8rem;
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
      <div style={{ width: '100%', height: '100%' }}>
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
    account: null,
    global: {
      ethereum: null,
      web3: null,
    },
    signature: {
      data: null,
      account: null,
    },
  }

  activate = () => {
    this.setState({
      activated: !this.state.activated,
    });
    this.props.onSignIn('some data');
  }

  componentDidMount() {
    this.setState({
      global: window,
    });
  }

  sign = async () => {
    const { account, global } = this.state;
    const data = Web3.utils.toHex('Hello World');
    const res = await global.web3.eth.personal.sign(data, account)
    if (account === recoverAddress(data, res)) {
      this.props.onSignIn();
    }
  }
  
  turnOnWeb3 = async () => {
    const { global } = this.state;
    if (typeof global === 'object') {
      if (global.ethereum) {
        global.web3 = new Web3(global.ethereum);
        try {
          // Request account access if needed
          await global.ethereum.enable();
          const accounts = await global.web3.eth.getAccounts();
          this.setState({
            account: accounts[0],
          });
          // Acccounts now exposed
          console.log('ENABLED');
        } catch (error) {
          // User denied account access...
          console.log('USER DENIED');
        }
      }
      // Legacy dapp browsers...
      else if (global.web3) {
        global.web3 = new Web3(global.web3.currentProvider);
        // Acccounts always exposed
        console.log('ENABLED')
      }
      // Non-dapp browsers...
      else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
      }
    }
  }

  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'row', padding: '', justifyContent: '', alignItems: '', height: '100vh' }}>
        <div style={{ display: 'flex', width: '40%', background: '#2424D0', minHeight: '100%' }}>

        </div>
        <div style={{ display: 'flex', width: '60%', background: '#810b0b', minHeight: '100%', flexDirection: 'column', alignItems: 'center' }}>
          <h1 style={{ color: 'silver' }}>Exclusive Zone</h1>
          { this.props.authorized ?
            <AccessControlled tokens={5} activated={this.props.authorized}>
              <div style={{ background: '#810b0b', display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%', alignItems: 'center', height: '100%', marginTop: '120px' }}>
                <img src={Church} style={{ width: '300px', height: '200px', paddingBottom: '16px' }} alt="img"/>
                <img src={Man} style={{ width: '300px', height: '200px', paddingBottom: '16px' }} alt="img"/>
                <img src={Flowers} style={{ width: '300px', height: '200px', paddingBottom: '16px' }} alt="img"/>
                <img src={Sunflower} style={{ width: '300px', height: '200px', paddingBottom: '16px' }} alt="img"/>
              </div>
            </AccessControlled>
            :
            <div style={{ display: 'flex', flexDirection: 'column' }}>
            <AccessButton onClick={this.turnOnWeb3}>Access<br/>With Convergent</AccessButton>
            <button onClick={this.sign}>Sign</button>
            <button onClick={this.deploy}>Test Deploy</button>
            </div>
          }
          </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authorized: state.auth,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onSignIn: (signature) => dispatch({type: 'SIGN', signature: signature})
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
